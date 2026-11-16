using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;

namespace webican
{
    public partial class SiteMenu : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!this.IsPostBack)
            {
                if (Session["Lang"] != null)
                {
                    if (Session["Lang"].ToString() == "th")
                    {
                        ddlLanguages.Items.FindByValue("th").Selected = true;
                    }
                    else if (Session["Lang"].ToString() == "en-us")
                    {
                        ddlLanguages.Items.FindByValue("en-us").Selected = true;
                    }
                }
            }
        }

        protected void ddlLanguages_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (ddlLanguages.SelectedValue == "th")
            {
                Session["Lang"] = "th";
                Response.Redirect(Request.Url.AbsoluteUri);
            }
            else if (ddlLanguages.SelectedValue == "en-us")
            {
                Session["Lang"] = "en-us";
                Response.Redirect(Request.Url.AbsoluteUri);
            }
        }
    }
}