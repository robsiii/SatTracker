/*
                      Geodesic Routines
                    James R. Clynch 2003

               Originally from 1960's NOAA manual converte by NOAA
               to a punched card Fortran program (M10) to pc Fortran
               at the Naval Postgraduate School by JRC
               -- Modified commons/variables/long statements --

               JRC Moved to Javascript 2 2003 for educational
               examples on web

               -Note- Needs JRC routines in geodesy.js 

               == must explicitly convert inputs to numbers ==
               == strings in sometimes work, sometimes not ! ==
*/


//     ==============================================================

// Title: direct geodesic

      function  gdsdir ( flat1i,flon1i, az1i,skmi )
//
//       geodesic direct computations
//
//       input lat lon ,  az and distance
//       compute end lat, lon,  back az
//
//       from m10 version 3
//
//     input:
//
//            flat1     r*8    latitude of begining in deg
//            flon1     r*8    longitude "    "       "
//            az1       r*8    az at pt 1 of geodesic  deg
//            skm       r*8    distance in km
//
//            (***  implicit input of a, f via common geodes  ***)
//
//    output:
//
//            flat2    r*8     latitude of end in deg
//            flon2    r*8     long. of end in deg
//            az2      r*8     az back along line at  end
//
//            var  ansdir[3]  returned
//
//------------------------------------------------------------------

     {
//
//
      var  ansdir = new Array(3)

      var    flat1,flon1,az1,skm;

      var    pi  = Math.PI;
      var   tpi  = 2.0*Math.PI;
      var   dtr  = Math.PI/180.0;
      var   rtd  = 180.0/Math.PI;

      var   akm,bkm,f,esq,a,s
      var   p1,e1,a1,p2,e2,a2
      var   elon1,faz,ratio,elon2
      var   tu,sf,cs,baz,cu,su,sa,c2a
      var   x,cx,d,y,sy,cy,er
      var   yp1,yp2

      var   flat2,flon2,az2
//
//------------------------------------------------------------------
//
//
//      ck and make sure have loaded some math constants
//      get current earth constants
//
      geodGBL()

      flat1    = Number(flat1i);
      flon1    = Number(flon1i);
      az1      = Number(az1i);
      skm      = Number(skmi);
      
      akm      =  EARTH_A;
      bkm      =  EARTH_B;
      f        =  EARTH_F;
      esq      =  EARTH_Esq;
//
      a        =   1000.0  * akm
//
      p1       =   dtr * flat1
      e1       =   dtr * flon1
      a1       =   dtr * az1
//
      s        =   1000.0  * skm
//
//    start the direct problem
//
      elon1    =    -e1
      faz      =     a1+pi
      if(faz  >  tpi) faz = faz - tpi
//
//      ratio = b/a
//      u     = eccentric anomanlie ( usually called "e")
//
      ratio     =     1.0 -f
//
      tu       =     ratio*Math.sin(p1)/Math.cos(p1)
      sf       =    -Math.sin(faz)
      cf       =    -Math.cos(faz)
//
      baz      =     0.0 
//
      if(cf != 0.0 ) baz =  2.0  * Math.atan2(tu,cf)
//
      cu       =     1.0 /Math.sqrt(1.0 +tu*tu)
      su       =     tu*cu
//
      sa       =     cu*sf
      c2a      =     1.0 -sa*sa
//
      x        =     Math.sqrt((1.0 + (1.0 /ratio/ratio  - 1.0 )*c2a))
      x        =     x + 1.0
      x        =     (x - 2.0 )/x
//
      cx       =     1.0   - x
      cx       =     (x*x/4.0  + 1.0 )/cx
      d        =     (0.375 *x*x - 1.0 )*x
      tu       =     s/ratio/a/cx
      y        =     tu
//
      kount    =     0
//
//100   continue
//

      for ( var kount=1; kount<40 ; kount++ )
     {

      sy       =      Math.sin(y)
      cy       =      Math.cos(y)
      cz       =      Math.cos(baz+y)
      er       =      2.0 *cz*cz - 1.0 
      cx       =      y
      x        =      er*cy
      y        =      er + er -1.0 
      yp1      =      tu
      yp2      =     (((sy*sy*4.0 -3.0 )*y*cz*d/6.0 +x)*d/4.0 -cz)*sy*d
      y        =      yp1 + yp2

      if (Math.abs(y-cx) < 0.5e-13) break

     }


      baz      =       cu*cy*cf - su*sy
      cx       =       ratio*Math.sqrt(sa*sa + baz*baz)
      d        =       su*cy+cu*sy*cf
      p2       =       Math.atan2(d,cx)
      cx       =       cu*cy-su*sy*cf
      x        =       Math.atan2(sy*sf,cx)
      cx       =       ((-3.0 *c2a+4.0 )*f +4.0 )*c2a*f/16.0 
      d        =       ((er*cy*cx+cz)*sy*cx+y)*sa

      elon2    =       (1.0  - cx)*d*f - x + elon1
      if   (elon2  >  pi)   elon2 = elon2-tpi
      if   (elon2 <= -pi)  elon2 = elon2+tpi

      e2       =      -elon2
      baz      =       Math.atan2(sa,baz)
      if(baz  <  0.0 ) baz = baz + tpi
      a2       =       baz + pi
      if(a2  >  tpi)    a2  = a2-tpi

//             end - convert and return items

      flat2    = p2 / dtr
      flon2    = e2 / dtr
      az2      = a2 / dtr

      ansdir[0]  =  flat2;
      ansdir[1]  =  flon2;
      ansdir[2]  =  az2;

      return   ansdir;

     }


//     ==============================================================
//     ==============================================================

//   title:'geodetic inverse'


      function gdsinv ( flat1i,flon1i, flat2i,flon2i)
//
//       geodesic inverse computations
//
//       input lat lon ,  ends of line,
//       compute forward and back az's, and length
//
//       from m10 version 3
//
//     input:
//
//            flat1     r*8    latitude of begining in deg
//            flon1     r*8    longitude "    "       "
//            flat2     r*8    latitude of end of line in deg
//            flon2     r*8    longitude "    "      "
//
//
//    output:
//
//            az1      r*8     az from beg along geodesic
//            az2      r*8     az back along line at  end
//            skm      r*8     distance in km along geodesic
//
//            returns  as ansinv[3]
//
//
//  -----------------------------------------------------------------
//
//    helmert rainsford inverse problem
//    do not use for meridional arcs and be careful on equator
//
//  ------------------------------------------------------------------
//
//    azimuths from north and long positive east
//
// -------------------------------------------------------------------
//
//   modhist
//             6.22.91 moved to pc
//             5-6-00  fixed co-located pts blowup in az computation
//
//
//------------------------------------------------------------------
//
     {

      var  flat1,flon1,flat2,flon2;

      var   ansinv = new Array(3)
      var   az1,az2,skm;

      var    pi  = Math.PI;
      var   tpi  = 2.0*Math.PI;
      var   dtr  = Math.PI/180.0;
      var   rtd  = 180.0/Math.PI;

      var   a,b,akm,bkm,f,esq,epsq
      var   s
      var   p1,e1,p2,e2
      var   f0,f1,f2,f3,f4
      var   dlon,ab
      var   u1,u2,tu1,tu2,su1,su2,cu1,cu2
      var   kount
      var   clon,slon,csig,ssig,sig,sinalf
      var   w,t4,t6

      var   aoa,aob,aoc,ao
      var   a2a,a2b,a2c,a2
      var   a4a,a4b,a4
      var   a6

      var  qo,q2,q4,q6
      var  r2,r3
      var  xz,xy,ab

      var  z
      var  bo,b2,b4,b6

      var  sm

      var  tana1,tana2,sina1,sina2



//       -------------------------------

      var  tol = 5.0e-15;


//------------------------------------------------------------------
//
//      ck and make sure have loaded some math constants
//      get current earth constants
//
//
      geodGBL()

     flat1     = Number(flat1i);
     flon1     = Number(flon1i);
     flat2     = Number(flat2i);
     flon2     = Number(flon2i);
      
      akm      =  EARTH_A;
      bkm      =  EARTH_B;
      f        =  EARTH_F;
      esq      =  EARTH_Esq;

      a        =   1000.0  * akm
      b        =   1000.0  * bkm

      p1       =   dtr * flat1
      e1       =   dtr * flon1
      p2       =   dtr * flat2
      e2       =   dtr * flon2

      epsq     =   esq / (1.0 -esq)

//             f0 = b/a

      f0       =   (1.0  - f)
      f2       =   f*f
      f3       =   f*f2
      f4       =   f*f3

//    test the longitude difference

      s        =   e2 - e1
      if(Math.abs(s)  <  tol) e2 =  e2 + tol

//    the longitude difference

      dlon     =   e2 - e1
      ab       =   dlon


//    the reduced latitudes

      tu1      =   f0*Math.sin(p1)/Math.cos(p1)
      tu2      =   f0*Math.sin(p2)/Math.cos(p2)

      u1       =   Math.atan(tu1)
      u2       =   Math.atan(tu2)

      su1      =   Math.sin(u1)
      cu1      =   Math.cos(u1)

      su2      =   Math.sin(u2)
      cu2      =   Math.cos(u2)


      for (var kount=0; kount<40; kount++ )

      {

      clon     =   Math.cos(ab)
      slon     =   Math.sin(ab)

      csig     =   su1*su2+cu1*cu2*clon

      ssig     =   Math.pow(slon*cu2,2);
      ssig     =   ssig + Math.pow(su2*cu1-su1*cu2*clon,2);
      ssig     =   Math.sqrt( ssig );

//      ssig     =   Math.sqrt((slon*cu2)**2+(su2*cu1-su1*cu2*clon)**2)

      sig      =   Math.atan2(ssig,csig)
      sinalf   =   cu1*cu2*slon/ssig

      w        =   (1.0  - sinalf*sinalf)
      t4       =   w*w
      t6       =   w*t4

//    the coefficients of type a

      aoa    =   f - f2*(1.0  + f + f2)*w/4.0 
      aob    =   3.0 *f3*(1.0  + 9.0 *f/4.0 )*t4/16.0 
      aoc    =  -25.0 *f4*t6/128.0 
      ao     =   aoa + aob + aoc

      a2a    =   f2*(1.0 +f+f2)*w/4.0 
      a2b    =  -f3*(1.0 +9.0 *f/4.0 )*t4/4.0 
      a2c    =   75.0 *f4*t6/256.0 
      a2     =   a2a + a2b + a2c

      a4a   =    f3*(1.0 +9.0 *f/4.0 )*t4/32.0 
      a4b   =   -15.0 *f4*t6/256.0 
      a4    =    a4a + a4b

      a6    =    5.0 *f4*t6/768.0 

//    the multiple angle functions

      qo       =    0.0 
      if(w > tol) qo =  -2.0 *su1*su2/w

      q2       =    csig+qo
      q4       =    2.0 *q2*q2 - 1.0 
      q6       =    q2*(4.0 *q2*q2 - 3.0 )
      r2       =    2.0 *ssig*csig
      r3       =    ssig*(3.0 -4.0 *ssig*ssig)

//    the longitude difference

      s        =    sinalf*(ao*sig+a2*ssig*q2+a4*r2*q4+a6*r3*q6)
      xz       =    dlon + s

      xy       =    Math.abs( xz - ab )
      ab       =    dlon + s

      if ( xy < 0.5e-13 )  break

         }


//    the coefficients of type b

      z        =    epsq*w

      bo  =   z * (    - 175.0 /16384.  )
      bo  =   z * ( bo + 5.0 /256.0     )
      bo  =   z * ( bo - 3.0 /64.0      )
      bo  =   z * ( bo + 1.0 /4.0       )
      bo  =       ( bo + 1.0             )

      b2  =  z * (     + 35.0 /2048.0  )
      b2  =  z * ( b2  - 15.0 /512.0   )
      b2  =  z * ( b2  +  1.0 /16.0    )
      b2  =  z * ( b2  -  1.0 /4.0     )

      b4  =  z * (     - 35.0 /8192.0 )
      b4  =  z * ( b4  +  3.0 /512.0  )
      b4  =  z * ( b4  -  1.0 /128.0  )
      b4  =  z *   b4

      b6  =  z*z*z* ( -1.0 /1536.0  + z*5.0 /6144.0  )

//    the arc distance in meters

      sm  =   b * ( bo*sig + b2*ssig*q2 + b4*r2*q4 + b6*r3*q6 )

//    compute the answers for azimuth

      az1   =   pi/2.0 
      if( dlon <  0.0 )  az1  = 3.0 *az1

      az2   =   az1 + pi
      if( az2 > tpi ) az2  =  az2 - tpi

      if ( Math.abs(sm) > 1.0  ) 

      {
      tana1       =    slon*cu2 / (su2*cu1 - clon*su1*cu2)
      tana2       =    slon*cu1 / (su1*cu2 - clon*su2*cu1)
      sina1       =    sinalf / cu1
      sina2       =   -sinalf / cu2

//    azimuths from north,longitudes positive east

      az1         =    Math.atan2(sina1, sina1/tana1)

      az2         =    pi - Math.atan2(sina2, sina2/tana2)
      }
     
//        convert the data and return it

      if (az1 < 0.0 ) az1 = az1 + tpi;
      if (az2 < 0.0 ) az2 = az2 + tpi;
      if (az1 > tpi ) az1 = az1 - tpi;
      if (az2 > tpi ) az2 = az2 - tpi;


      az1  =  az1 / dtr
      az2  =  az2 / dtr
      skm  =  0.001  * sm


      ansinv[0]  =  az1;
      ansinv[1]  =  az2;
      ansinv[2]  =  skm;

      return  ansinv;

     }


//     ==============================================================
//     ==============================================================

//     title:'deg arc geodesic step'


      function gdsdeg ( flat, flon, az,arc)

//
//        go a fixed arc length along geodesic
//        from fixed starting point and given take of az
//        - for spherical earth is earth central angle -
//
//   input:
//             flat      r*8       geodetic latitude begin  deg n
//             flon      r*8       longitude begin deg 2
//             az        r*8       take off az deg
//             arc       r*8       earth central angle to step deg
//
//   output:
//             flate     r*8       end geodetic latitude
//             flone     r*8       end longitude
//             aze       r*8       end back az
//             skm       r*8       distance along geodesic in km
//
//              returns   ansdeg[4]
//
//   modhist
//             jrc 2-03  code
//
//
     {

      var  ansdeg = new Array(4);
      var  flate,flone,aze,skm;


      var    pi  = Math.PI;
      var   tpi  = 2.0*Math.PI;
      var   dtr  = Math.PI/180.0;
      var   rtd  = 180.0/Math.PI;

      var  upbeg = new Array(3);
      var  upend = new Array(3);

      var  azuse,arcu
      var  caz,saz
      var  clat,slat,clon,slon
      var  rrnrm = new Array(3)
      var  r,rn,rm
      var  riv,ruse,skmuse

      var  nloop
      var  flat2,flon2,az2
      var  ansdir = new Array(3)

      var  clat2,slat2,clon2,slon2
      var  ctheta
      var  arcn,darc,dsr



//        ---------------------------------------------------


      azuse =  az
      arcu  =  arc

      if ( arcu > 180.0  )
         {
          arcu  =  360.0  - arc
          azuse =  - az
        }

      caz   =  Math.cos(dtr*azuse)
      saz   =  Math.sin(dtr*azuse)

      clat  =  Math.cos(dtr*flat)
      slat  =  Math.sin(dtr*flat)
      clon  =  Math.cos(dtr*flon)
      slon  =  Math.sin(dtr*flon)

      upbeg[0]  =   clat*clon
      upbeg[1]  =   clat*slon
      upbeg[2]  =   slat

//        get effective radius of curvature initial try

      rrnrm =  radcur(flat);
      rn    =  rrnrm[1];
      rm    =  rrnrm[2];
      riv   =  (caz*caz/rm) + (saz*saz/rn)
      ruse  =  1.0  / riv

      skmuse  =  dtr * arcu * ruse


//                  ----------------

      nloop  = 1
//

      for (var nloop=0; nloop <5 ; nloop++ )

        {

//             shot, test, adjust

      ansdir =  gdsdir ( flat,flon,az,skmuse)

      flat2  =  ansdir[0];
      flon2  =  ansdir[1];
      az2    =  ansdir[2];

      if (nloop > 4 ) break

//
//             arc difference is angle between "up" vectors
//             (perpendicular to ellipsoid)

      clat2   =  Math.cos(dtr*flat2)
      slat2   =  Math.sin(dtr*flat2)
      clon2   =  Math.cos(dtr*flon2)
      slon2   =  Math.sin(dtr*flon2)

      upend[0]=  clat2*clon2
      upend[1]=  clat2*slon2
      upend[2]=  slat2

      ctheta  =  upend[0]*upbeg[0]+upend[1]*upbeg[1]+upend[2]*upbeg[2];

      if ( ctheta >    1.0  ) ctheta = 1.0 
      if ( ctheta <   -1.0  ) ctheta =-1.0 

      arcn    =  rtd * Math.acos( ctheta )

      darc    =  arcn - arcu
      dsr     =  dtr * darc * ruse

      if (Math.abs(dsr) < 0.00001  ) break

      skmuse  =  skmuse - dsr


        }


      flate  = flat2
      flone  = flon2
      aze    = az2
      skm    = skmuse

//             store return values in array and return them

 
      ansdeg[0]  = flate;
      ansdeg[1]  = flone;
      ansdeg[2]  = az2;
      ansdeg[3]  = skm;

      return  ansdeg;

     }

