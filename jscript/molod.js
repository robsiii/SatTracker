/*
	This is a javascript version of a fortran routine produced
	for use in education.  
	Author:  James R. Clynch
*/


//   =======================================================


     function Molod(lat,lon,da,df,dx,dy,dz)

     {

//        Perform the Transform of datums via molodensky abridged

//   input:
//        lat       latidue in degrees  north
//        lon       longitude in degrees east
//        da        da in meters
//        df        dimensionless
//        dx        x shift value meters
//        dy        y shift   "     "
//        dz        z shift   "     "
//
//   output:
//        Array  Dneu
//                  [0]       North motion in meters
//                  [1]       East    "     "   "
//                  [2]       Up      "     "   " 
//
//

     var  Dneu    =  new Array(3)
     var  rrnrm   =  new Array(3)
     var  rn,rm
     var  dtr,clat,slat,clon,slon
     var  dn1,dn2,dn3,dn
     var  de
     var  dh1,dh2,dh3,dh

//      for this purpose can use fixed a,b,ecc**2

     var  esq
     var  a    = 6378137;
     var  b    = 6356752;
     
     esq      =  1.0 - Math.pow((b/a),2);

//        ----------------------------------

     rrnrm =  radcur ( lat);
     rn    =  1000.0 * rrnrm[1];
     rm    =  1000.0 * rrnrm[2];

     dtr   =  Math.PI/180.0;
     clat  =  Math.cos(dtr*lat);
     slat  =  Math.sin(dtr*lat);
     clon  =  Math.cos(dtr*lon);
     slon  =  Math.sin(dtr*lon);

//             north motion, by effect variable (delta, da,df )

     dn1   = - dx*slat*clon - dy*slat*slon + dz*clat;
     dn2   =  da*rn*esq*slat*clat/a;
     dn3   =  df*( (rm*a/b) + (rn*b/a) )*slat*clat;
     dn    =  dn1 + dn2 + dn3;

//             east motion only has delta effects

     de    =  -dx*slon +dy*clon;

//             height motion 3 effects added

     dh1   =  dx*clat*clon +dy*clat*slon + dz*slat;
     dh2   = -da*a/rn;
     dh3   =  df*(b*rn/a)*slat*slat;
     dh    =  dh1 + dh2 + dh3;

//         return variables

     Dneu[0]   = dn;
     Dneu[1]   = de;
     Dneu[2]   = dh;

     return (Dneu );

     }

//   ==========================================================
