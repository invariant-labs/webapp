import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({

  outerWrapper: {display:"flex", width: "360px", height:"70px",fontFamily:"Mukta", flexDirection:"column",justifyContent:"flex-start", alignContent:"flex-start", alignItems:"flex-start", backgroundColor:"#3A466B",color: "#A9B6BF", padding:"20px", borderRadius:"14px"},

depositHeader:{fontSize: "14px", letterSpacing: "-0.03em", lineHeight: "17px",opacity:"0.65", marginBottom:"20px", marginTop: "-10px"},
secondRow:{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"flex-start"},
priceWrapper:{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"flex-start", gap:"10px", alignContent:"flex-start", marginTop:"-25px"},
priceText:{display:"flex", textAlign:"left", fontSize: "12.2px",lineHeight: "14px", letterSpacing: "-0.03em", opacity:"0.65"}


}))

export default useStyles
