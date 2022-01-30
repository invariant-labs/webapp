import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
outerCardCenter:{

display:"flex", flexDirection: "column", alignItems:"center", justifyContent:"center", textAlign:"center",

backgroundColor: "#2A365C",
width:"230px",
height:"80px",


'&:hover': {
    backgroundColor: "#202946"
    
  }


},

outerCardCenterDark:{

  display:"flex", flexDirection: "column", alignItems:"center", justifyContent:"center", textAlign:"center",
  
  backgroundColor: "#202946",
  width:"230px",
  height:"80px",


  '&:hover': {
      backgroundColor: "#111931"

}
},

   logoImg:{
display:"flex",
width: "10%",
marginRight:"2%"


   }
,


  grayText:{
      color:"#A9B6BF",
      marginTop:"-5px",

      fontFamily: "Mukta",
fontStyle: "normal",
fontWeight: "normal",
fontSize: "14px",
lineHeight: "17px",
letterSpacing: "-0.03em"
  },

  whiteDisplay:{
    fontFamily: "Mukta",
      color:"white",
      fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "-0.03em"
  },
  ellipse:{

    background: "radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)",
    width: "20px",
    height: "20px",
    borderRadius:"50%",
    marginRight: "5px"

  }


}))

export default useStyles
