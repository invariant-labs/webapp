import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({

inputWrapper:{

  display:"flex", flexDirection:"column", justifyContent:"space-around",
width:"368px", borderRadius: "16px"
},


  firstRow: {
    display:"flex",
    flexDirection:"row",
    color: "white",
    alignItems:"flex-start",
    fontFamily: "Mukta",
    justifyContent:"space-between",
    justifyItems:"center",
    
    '&:hover': {
      
    }
  },

  coinName: {
    backgroundColor: "#3A466B",
    borderRadius: "12px",
     color:"white",
     padding:"10px",
     marginTop:"15px",
     
    
/* or 120% */

   display: "flex",
   alignItems: "center",
  
   
    '&:hover': {
      
    }
  },

  ellipse:{

    background: "radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)",
    width: "20px",
    height: "20px",
    borderRadius:"50%",
    marginRight: "5px"




  },

  SNY:{
    color:"white",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "-0.03em"
  },

  balanceText:{
    color: "#A9B6BF",
   

    '&:hover': {
      
      color: "white"
    }
  },

  maxButton : {

    color:"black",
    backgroundColor: colors.invariant.green,
    width: "26px",
    height: "14px",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontSize: "10px",
    lineHeight :"24px",
    letter:"-3%",
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
    textAlign: "center",
    padding:"5px",
    marginLeft: "5px"

  },

  valueChange :{
    color:`${colors.invariant.error}`,
    backgroundColor: "rgba(251,85,95, 0.2)",
    padding:"5px",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "13px",
    marginRight: "10px",
    display:"flex",
    alignSelf:"center"
  

  },

  displayValue:{
    fontFamily: "Mukta",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "32px",
    textAlign: "right",
    letterSpacing: "-0.03em",
  }

  ,disabled: {
    background: `${colors.invariant.componentOut3} !important`,
    color: `${colors.invariant.background2} !important`
  }
}))

export default useStyles
