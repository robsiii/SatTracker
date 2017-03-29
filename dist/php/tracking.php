<?php
if (! $sats = $Cache->read('sats')) {
  $date = array(0 => date('Y-m-d\TH:i:s', strtotime('-1 hour')).'.000Z', 1 => date('Y-m-d\TH:i:s', time()).'.000Z');
  
  $norad_url = 'https://heliophysicsdata.gsfc.nasa.gov/websearch/dispatcher?action=GET_SPASE_XML_ACTION&save=true&resId=';
  $info_url = 'https://nssdc.gsfc.nasa.gov/nmc/spacecraftDisplay.do?id=';

  function GET_api ($what) {
      // Instantiate curl
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, 'https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/' . $what);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept: application/json'));
      $result = curl_exec($curl);
      curl_close($curl);

      // Json decode
      $result = json_decode($result);

      return $result;
  }

  function GET_info ($url, $id) {
      // Instantiate curl
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url . $id);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      $result = curl_exec($curl);
      curl_close($curl);

      return $result;
  }

  function POST_api ($what, $timeStart, $timeEnd, $sat) {

      $XML1 = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><DataRequest xmlns="http://sscweb.gsfc.nasa.gov/schema">';
      $XML2 = '<BFieldModel><InternalBFieldModel>IGRF-10</InternalBFieldModel><ExternalBFieldModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Tsyganenko89cBFieldModel"><KeyParameterValues>KP3_3_3</KeyParameterValues></ExternalBFieldModel><TraceStopAltitude>100</TraceStopAltitude></BFieldModel>';
      $XML3 = '<OutputOptions><AllLocationFilters>true</AllLocationFilters><CoordinateOptions><CoordinateSystem>Gse</CoordinateSystem><Component>X</Component></CoordinateOptions><CoordinateOptions><CoordinateSystem>Gse</CoordinateSystem><Component>Y</Component></CoordinateOptions><CoordinateOptions><CoordinateSystem>Gse</CoordinateSystem><Component>Z</Component></CoordinateOptions><MinMaxPoints>2</MinMaxPoints></OutputOptions></DataRequest>';
      $time_interval = '<TimeInterval><Start>' . $timeStart . '</Start><End>' . $timeEnd . '</End></TimeInterval>';
      $sat_id = '<Satellites><Id>' . $sat . '</Id><ResolutionFactor>2</ResolutionFactor></Satellites>';

      $url = 'https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/' . $what;
      $data = $XML1 . $time_interval . $XML2 . $sat_id . $XML3;

     // Instantiate curl
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, 'https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/' . $what);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

      curl_setopt($curl, CURLOPT_POST, true);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

      curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-type: application/xml'));

      $result = curl_exec($curl);
      curl_close($curl);

      // Json decode
      $result = json_decode($result);

      return $result;

  }

  //Show result
  $all_sats = GET_api ('observatories');
  $sats = array();

  foreach($all_sats -> Observatory[1] as $_key => $_sat) {

      $_location = POST_api('locations', $date[0], $date[1], $_sat -> Id);

      if (isset($_location->Result->Data)) {

          if ($_sat->ResourceId != '') {
              $_info = simplexml_load_string(GET_info($norad_url, $_sat->ResourceId));
              $_norad = (string) $_info->Observatory->ResourceHeader->AlternateName[1];
              if ($_norad == '') {
                  $_norad = 'Pas de NORAD';
              }

              $_description = (string) $_info->Observatory->ResourceHeader->Description;

              $_html = GET_info($info_url, $_norad);

              $_dom = new DOMDocument;
              $_dom->loadHTML($_html);
              $_xpath = new DOMXPath($_dom);

              $_facts = $_xpath -> query('/html[@xmlns="http://www.w3.org/1999/xhtml"]/body/div[@id="paper"]/div[2]/div[1]/div[2]/div[2]/*');
              foreach($_facts as $_node) {
                  if ($_node->nodeName == 'h2') {
                      if ($_node->nodeValue == 'Funding Agency') {
                          $_next_node = $_xpath->query("./following-sibling::*[1]/li/text()", $_node);
                          if ($_next_node->length) {
                              $_country = $_next_node->item(0)->nodeValue;
                          }
                      }

                      if ($_node->nodeValue == 'Discipline') {
                          $_next_node = $_xpath->query("./following-sibling::*[1]/li/text()", $_node);
                          if ($_next_node->length) {
                              $_discipline = $_next_node->item(0)->nodeValue;
                          }
                      }
                  }
              }


              $_facts = $_xpath -> query('/html[@xmlns="http://www.w3.org/1999/xhtml"]/body/div[@id="paper"]/div[2]/div[1]/div[2]/div[2]/p[1]/*');
              foreach($_facts as $_node) {
                  if ($_node->nodeValue == 'Mass:') {
                      $_next_node = $_xpath->query('./following-sibling::node()[1]/self::text()[normalize-space()]', $_node);
                      if ($_next_node->length) {
                          $_mass = $_next_node->item(0)->nodeValue;
                      }
                  }
              } 

              $_infos = array('norad' => $_norad, 'country' => $_country, 'discipline' => $_discipline, 'mass' => $_mass, 'description' => $_description);

          }
          else $_infos = 'Pas de données';

          $sat = array ('name' => $_sat->Name, 'id' => $_location->Result->Data[1][0]->Id, 'infos' => $_infos, 'date' => date('m-d-Y', strtotime($_sat -> StartTime[1])), 'posX' => $_location->Result->Data[1][0]->Coordinates[1][0]->X[1][count($_location->Result->Data[1][0]->Coordinates[1][0]->X[1])-1], 'posY' => $_location->Result->Data[1][0]->Coordinates[1][0]->Y[1][count($_location->Result->Data[1][0]->Coordinates[1][0]->Y[1])-1], 'posZ' => $_location->Result->Data[1][0]->Coordinates[1][0]->Z[1][count($_location->Result->Data[1][0]->Coordinates[1][0]->Z[1])-1]);

          $sats[] = $sat;
      }
  }
  $Cache->write('sats', json_encode($sats));
}