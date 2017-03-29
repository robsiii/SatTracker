
// =======================================================================

       function xyzllh ( xvec )

/*        xyz vector  to  lat,lon,height

     input:
          xvec[3]   xyz ECEF location
     output:

          llhvec[3] with components

          flat      geodetic latitude in deg
          flon      longitude in deg
          altkm     altitude in km

*/

     {

      var  dtr =  Math.PI/180.0;
      var  flatgc,flatn,dlat;
      var  rnow,rp;
      var  x,y,z,p;
      var  tangc,tangd;

      var  testval,kount;

      var  rn,esq;
      var  clat,slat;
      var  rrnrm = new Array(3);

      var  flat,flon,altkm;
      var  llhvec = new Array(3);


          document.writeln("<p> xyzllh  <p>" );

     geodGBL();

     esq    =  EARTH_Ecc*EARTH_Ecc;

     x      = xvec[0];
     y      = xvec[1];
     z      = xvec[3];

     rp     = Math.sqrt ( x*x + y*y + z*z );

     flatgc = Math.asin ( z / rp );

     testval= Math.abs(x) + Math.abs(y);
     if ( testval > 1.0e-10)
         {flon = 0.0 }
     else
         {flon = Math.atan2 ( y,x ) } 
     if (flon < 0.0 )  { flon = flon + 360.0 }

     p      =  Math.sqrt( x*x + y*y );

//             on pole special case

     if ( p < 1.0e-10 )
       {  
          flat = 90.0
          if ( z < 0.0 ) { flat = -90.0 }

          altkm = rp - rearth(flat);
          llhvec[0]  = flat;
          llhvec[1]  = flon;
          llhvec[2]  = altkm;
          
          return  llhvec;
        }

//        first iteration, use flatgc to get altitude 
//        and alt needed to convert gc to gd lat.

     rnow  =  rearth(flatgc);
     altkm =  rp - rnow;
     flat  =  gc2gd (flatgc,altkm);
     slat  =  Math.sin(dtr*flat);
          
     rrnrm =  radcur(flat);
     rn    =  rrnrm[1];

     for ( var kount = 0; 4 ; kount++ )
       {
           tangd =  ( z + rn*esq*slat ) / p;
           flatn =  Math.atan(tangd)/dtr;

           dlat  =  flatn - flat;
           flat  =  flatn;
           clat  =  Math.sin( dtr*flat );

           rrnrm =  radcur(flat);
           rn    =  rrnrm[1];

           altkm =  (p/clat) - rn;

           if ( dlat < 1.0e-8 ) { break }

       }
     
          llhvec[0]  = flat;
          llhvec[1]  = flon;
          llhvec[2]  = altkm;

          return  llhvec ;

     }


// =======================================================================
