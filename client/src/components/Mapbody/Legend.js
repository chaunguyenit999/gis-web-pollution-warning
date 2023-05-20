import "./Legend.css";

function Legend() {
    return (
        <div className="legend" >
          <table>
            <tbody>
            <tr>
              <td style={{backgroundColor:"#00e400", color:"#000000",padding:"0px 9px",borderTopLeftRadius: "15px",borderBottomLeftRadius:  "15px"}}>Tốt</td>
              <td style={{backgroundColor:"#ffff00", color:"#000000",padding:"0px 9px"}}>Trung bình</td>
              <td style={{backgroundColor:"#ff7e00", color:"#000000",padding:"0px 9px"}}>Không lành mạnh cho các nhóm nhạy cảm</td>
              <td style={{backgroundColor:"gray", color:"#ffffff",padding:"0px 9px"}}>Không lành mạnh</td>
              <td style={{backgroundColor:"#ff0000", color:"#ffffff",padding:"0px 9px"}}>Rất không lành mạnh</td>
              <td style={{backgroundColor:"#7f00ff", color:"#ffffff",padding:"0px 9px",borderTopRightRadius: "15px",borderBottomRightRadius:  "15px"}}>Nguy hiểm</td>
            </tr>
            </tbody>
          </table>
        </div>
      );

}
export default Legend;
