using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
namespace webican
{
    public partial class service_product : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Lang"].ToString() == "th")
            {
                //  div2.Style["display"] = "none";
                //   div_img1.Style["display"] = "block";
                Image1.ImageUrl = "/Content/images/BS-TH.png";
                HyperLink1.NavigateUrl = "/Content/images/BS-TH.png";
            }
            else
            {
                //   div_img1.Style["display"] = "none";
                //   div2.Style["display"] = "block";
                Image1.ImageUrl = "/Content/images/BS-EN.jpg";
                HyperLink1.NavigateUrl = "/Content/images/BS-EN.jpg";
            }
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            Response.ContentType = "Application/pdf";
            Response.AppendHeader("Content-Disposition", "attachment; filename=Ican alert (Thai Version).pdf");
            Response.TransmitFile(Server.MapPath("~/PDF/ican_alert_th.pdf"));
            Response.End();
        }

        protected void LinkButton2_Click(object sender, EventArgs e)
        {
            Response.ContentType = "Application/pdf";
            Response.AppendHeader("Content-Disposition", "attachment; filename=Ican alert (English Version).pdf");
            Response.TransmitFile(Server.MapPath("~/PDF/ican_alert_en.pdf"));
            Response.End();
        }

    }
}