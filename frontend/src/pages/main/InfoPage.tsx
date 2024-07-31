import AppBarTop from "../../components/Bars/AppBarTop";
import Box from "@mui/material/Box";
import { useContext } from "react";
import {  WhoIsCtx } from "../../store/WhoIsCtx";

const InfoPage: React.FC = () => {
  const WhoIsContext = useContext(WhoIsCtx)
  return (
    <div >
      <AppBarTop whoIs={WhoIsContext.WhoIs} />
        <h1>העמוד עדין בעבודות , בעמוד זה אמור להיות תיאור למערכת וקרדיט לאנשים שנתנו יד . מוזמנים בחזרה לחזור לעמוד הבית </h1>
    </div>
  );
};


export default InfoPage;
//עדין בעבודות