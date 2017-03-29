
/*           Date and Time Routines in Javascript
                 James R. Clynch / 2003
*/



<!--


// =======================================================================


     function FourDigitYear ( year )

//        return a number that is the 4 digit representation of the year
//        input that can be 2 or 4 digitis


//        ------------------------------------------------------
//        ==  assumes a 2 digit year is in range 1950 to 2049 ==
//        ------------------------------------------------------

     {
          var y,yr
    
          y      = Number(year);
          yr     = y;

          if (y < 100 ) yr = y + 1900;
          if (y <  50 ) yr = y + 2000;

          return yr;

     }

// =======================================================================

     function LeapYear (year)

//   input:
//             year      2 or 4 digit year
//   output:
//             logical value,  TRUE if is leap year, FALSE if not


     {

          var  y,yr4,even4,even100,even200
          var  ly

          
          y    = Number(year);
          yr4  = FourDigitYear(year);

          ly   = false;
          
          even4   = yr4 -  4*Math.floor(yr4/4);
          even100 = yr4 -100*Math.floor(yr4/100);
          even400 = yr4 -400*Math.floor(yr4/400);

          if (even4   == 0) ly = true;
          if (even100 == 0) ly = false;
          if (even400 == 0) ly = true;

          return ly;

     }


// =======================================================================

     function DayOfYear (month,dayofmonth,year)

//        input:
//                  month          month range 1-12
//                  dayofmonth     day of month
//                  year           2 or 4 digit year

//        output:
//                  day of year  1 to 365/366
//                  -1 if error


     {


     var LenMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

     var  m,dom,leap,doy, i

          m     = Number(month);
          dom   = Number(dayofmonth);

          if ( m < 1 || m > 12 ) return -1;
         
          leap  = LeapYear( year );
          if ( leap )  LenMonth[1] = LenMonth[1] + 1;

          if (dom < 0 || dom > LenMonth[m-1])  return -1;

          doy = 0;
          for ( var i=0 ; i<m ; i++ )
           { doy = doy + LenMonth[i]; }

          doy = doy - LenMonth[m-1] + dom;

          return doy;

     }

// =======================================================================

     function DOY2MDY ( dayofyear,year)


//   Day of year (and year - for leap year computation) to 
//   Month, Day, Year
//
//        input:
//                  dayofyear      day of year 1 to 366
//                  year           year, 2 or 4 digit

//        output:
//                  vector mdy
//                  [0]            month 1 to 12
//                  [1]            day of month
//                  [2]            year, 4 digit
//                  all = 0 if error


     {


     var LenMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

     var mdy = new Array(3);

     var  doy,y, leap, m, dom, i

          mdy[0]    =0;
          mdy[1]    =0;
          mdy[2]    =0;
     

          doy   = Number(dayofyear);
          y     = Number(year);
          y     = FourDigitYear( y );

          if ( doy < 1  || doy > 366 ) return mdy;


          leap  =  LeapYear( y );
          if ( leap )  LenMonth[1] = LenMonth[1] + 1;


          m   =    0;
          dom =  doy;
          for ( var i=0 ; i<12 ; i++ )
           { m = i+1;
             if (dom <= LenMonth[i])  break;
             dom = dom - LenMonth[i];
           }

          mdy[0]   = m;
          mdy[1]   = dom;
          mdy[2]   = y;

          return mdy;

     }

// =======================================================================

//-->

