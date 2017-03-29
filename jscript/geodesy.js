
/*             geodesy routines in JavaScript
                 James R. Clynch NPS / 2003
               
          Done for support of web education pages

	NOTE WELL:

	These routines use global variables for the earth figure constants.
	You must call WGS84()   before using other functions, or set the values
      explicitly using the function earthcon(a,b).


*/



<!--

// =======================================================================

       function earthcon(a,b)

/*        Sets Earth Constants as globals
             --  input a,b
             --  Leaves Globals 
                 EARTH_A      EARTH_B   EARTH_F  EARTH_Ecc
*/

     {
           var  f,ecc, eccsq

           f        =  1-b/a;
           eccsq    =  1 - b*b/(a*a);
           ecc      =  Math.sqrt(eccsq);

           EARTH_A  =  a;
           EARTH_B  =  b;
           EARTH_F  =  f;
           EARTH_Ecc=  ecc;
     }


// =======================================================================

     function wgs84()
   
/*        WGS84 Earth Constants
             --  returns a,b,f,e  --
             --  Leaves Globals 
                 EARTH_A      EARTH_B   EARTH_F  EARTH_Ecc

*/

     {
          var  wgs84a, wgs84b, wgs84f

          wgs84a         =  6378.137;
          wgs84f         =  1.0/298.257223563;
          wgs84b         =  wgs84a * ( 1.0 - wgs84f );

          earthcon (wgs84a, wgs84b );

     }          


// =======================================================================

    function  radcur(lat)

/*
       compute the radii at the geodetic latitude lat (in degrees)
     
     input:
               lat       geodetic latitude in degrees
     output:   
               rrnrm     an array 3 long
                         r,  rn,  rm   in km

*/

{

     var rrnrm = new Array(3)

     var dtr   = Math.PI/180.0

     var  a,b
     var  asq,bsq,eccsq,ecc,clat,slat
     var  dsq,d,rn,rm,rho,rsq,r,z

//        -------------------------------------

     var  tstglobal
     tstglobal = typeof EARTH_A;
     if ( tstglobal == "undefined" )  wgs84() 

     a     = EARTH_A;
     b     = EARTH_B;

     asq   = a*a;
     bsq   = b*b;
     eccsq  =  1 - bsq/asq;
     ecc = Math.sqrt(eccsq);

     clat  =  Math.cos(dtr*lat);
     slat  =  Math.sin(dtr*lat);

     dsq   =  1.0 - eccsq * slat * slat;
     d     =  Math.sqrt(dsq);

     rn    =  a/d;
     rm    =  rn * (1.0 - eccsq ) / dsq;

     rho   =  rn * clat;
     z     =  (1.0 - eccsq ) * rn * slat;
     rsq   =  rho*rho + z*z;
     r     =  Math.sqrt( rsq );

     rrnrm[0]  =  r;
     rrnrm[1]  =  rn;
     rrnrm[2]  =  rm;

     return ( rrnrm );

   }

// =======================================================================

//        physical radius of earth from geodetic latitude

     function  Rearth (lat)
     {
          var    rrnrm, r

          rrnrm =  radcur ( lat );
          r     =  rrnrm[0];

          return ( r );

     }


//-->

