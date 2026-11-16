using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace webican
{
    public partial class contact_us : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //string path = Server.MapPath("/Content/images/Map-Thai.png/");
           
            if (Session["Lang"].ToString() == "th")
            {
              //  div2.Style["display"] = "none";
             //   div_img1.Style["display"] = "block";
                  Image1.ImageUrl = "/Content/images/Map-Thai.png";
                    hp1.NavigateUrl ="/Content/images/Map-Thai.png";
            }
            else 
            {
             //   div_img1.Style["display"] = "none";
             //   div2.Style["display"] = "block";
                 Image1.ImageUrl ="/Content/images/Map-Eng.png";
                  hp1.NavigateUrl ="/Content/images/Map-Eng.png";
            }
           
        }
    }
}