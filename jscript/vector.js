
/*            Vector Routine  ===  3 Vectors in Physics sense ===
                 James R. Clynch NPS / 2003
*/



<!--

// =======================================================================

     function  dot (v1,v2)

//        return the dot product of two vectors 
     {
     var sum;

     sum  = v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
     return sum;
     }


// =======================================================================

     function  cross ( v1,v2 )

//        return the cross product as a 3-vector

     {
      var    a,b,c
      var    v3 = new Array(3)

      v3[0]   = v1[1]*v2[2]  -  v1[2]*v2[1] ;
      v3[1]   = v1[2]*v2[0]  -  v1[0]*v2[2] ;
      v3[2]   = v1[0]*v2[1]  -  v1[1]*v2[0] ;
      
      return  v3;

     }

// =======================================================================

     function  vecmag ( v )

//        return the magnitude of the vector

     {
      var   msquare, mag;

      msquare  = dot ( v,v );
      mag      = Math.sqrt(msquare);

      return   mag;
     }
// =======================================================================

      function  cosvec ( v1,v2 )

//        cosine of vector between two vectors

      {

          var    v1dv2, mv1,mv1,m12, cv ;

         v1dv2  = dot ( v1,v2 );
         mv1    = vecmag( v1 );
         mv2    = vecmag( v2 );
         m12    = mv1*mv2;
       
         if ( Math.abs(m12) > 1.0e-30 )
             { cv  =  v1dv2/m12; }
         else
             { cv =  0 ;        }

         return  cv;
     }

// =======================================================================


      function  angle_vecs ( v1,v2 )

//        angle between two vectors

      {

          var    dtr,cvec,angle;

          dtr    = Math.PI/180.0;

          cvec   = cosvec ( v1,v2);
          angle  = Math.acos (cvec) / dtr ;

          return  angle
     }

// =======================================================================

//-->

