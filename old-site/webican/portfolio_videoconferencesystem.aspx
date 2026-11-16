<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="portfolio_videoconferencesystem.aspx.cs" Inherits="webican.portfolio_videoconferencesystem" %>
<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
             <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx"><asp:Label ID="Label3" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li><asp:Label ID="Label1" Text="IT INFRASTRUCTURE" runat="server" /></li>
            </div>
        </div>
    </div>
    <br />
      <%--เมนู--%>
     <div class="container">
            <h2> <p>PORTFOLIO : VIDEO CONFERENCE SYSTEM</p></h2>
            <hr />
                <ul class="nav nav-tabs" style="font-size:10px;font-weight:bold">
                  <li ><a href="portfolio_datacenter.aspx">Data Center</a></li>
                  <li ><a href="portfolio_icanalert.aspx">ICAN Alert</a></li>
                  <li ><a href="portfolio_networkinfrastructure.aspx">Network Infrastructure</a></li>
                  <li ><a href="portfolio_networkequipment.aspx">Network Equipment</a></li>
                  <li><a href="portfolio_serverandpc.aspx">Server and Pc</a></li>
                  <li><a href="portfolio_powersupply.aspx">Power Supply</a></li>
                  <li><a href="portfolio_cctvsystem.aspx">CCTV System</a></li>
                  <li><a href="portfolio_ipphonesystem.aspx">IP Phone System</a></li>
                  <li><a href="portfolio_extinguishersystem.aspx">Fire Extinguisher System</a></li>
                  <li class="active"><a href="#">Video Conference System</a></li>
                  <li><a href="portfolio_accesscontrol.aspx">Access Control</a></li>

               </ul>
               <hr />
         <br />

     </div>

      <%--แถว1--%>
     <div class="container">
         <br />
        <div class="col-md-3 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/portfolio/video/1.jpg" class="img-responsive" style="width:287px;height:199px;" />
                 <p class=" text-center"><asp:Label ID="Label20" Text="Video Conference" runat="server" /> </p>
           
        </div>
        <div class="col-md-3 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/portfolio/video/2.jpg" class="img-responsive" style="width:287px;height:199px;" />
                 <p class=" text-center">
                <asp:Label ID="Label21" Text="Video Conference" runat="server" />
            </p>
          


        </div>
        <div class="col-md-3 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/portfolio/video/3.jpg" class="img-responsive" style="width:287px;height:199px;" />
                 <p class=" text-center">
                <asp:Label ID="Label22" Text="Meeting" runat="server" />
            </p>
           
        </div>
                    <div class="col-md-3 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/portfolio/video/4.jpg" class="img-responsive" style="width:287px;height:199px;" />
             <p class=" text-center">
                <asp:Label ID="Label2" Text="Meeting" runat="server" />
            </p>
           
        </div>

    </div>
      <%--แถว2--%>
     <div class="container">
         <br />
        <div class="col-md-3 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/portfolio/video/5.jpg" class="img-responsive" style="width:287px;height:199px;" />
            <p class=" text-center"><asp:Label ID="Label4" Text="Projector" runat="server" /> </p>
           
        </div>
        <div class="col-md-3 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/portfolio/video/6.jpg" class="img-responsive" style="width:287px;height:199px;" />
             <p class=" text-center">
                <asp:Label ID="Label5" Text="Projector" runat="server" />
            </p>
        </div>
       

    </div>
    <br />
</asp:Content>
