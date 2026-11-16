<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="service_product.aspx.cs" Inherits="webican.service_product" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
   <%-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>--%>
    <script src="Scripts/jquery-1.10.2.js"></script>
     <style type="text/css">
     
         .navbar-nav .nav-link {
             position: relative;
         }

         @media (min-width: 992px) {
             .navbar-expand-lg .navbar-nav .nav-link {
                 padding-right: 1rem;
                 padding-left: 1rem;
                 font-size: 14px;
             }

             .navbar-nav > .nav-item > .nav-link.active:after {
                 content: "";
                 border-bottom: 2px solid #cd99d4;
                 left: 1rem;
                 right: 1rem;
                 bottom: 5px;
                 height: 1px;
                 position: absolute;
             }

             .nav-tabs .nav-item .nav-link,
             .nav-tabs .nav-link:focus,
             .nav-tabs .nav-link:hover {
                 padding: 1rem 1rem;
                 border-color: #faf6fb #faf6fb #FFF;
                 font-size: 19px;
                 color: #b5a4c8;
                 background: #f5eff7;
             }

             .nav-tabs .nav-link.active {
                 background: #FFF;
                 border-top-width: 3px;
                 border-color: #ce75b4 #faf6fb #FFF;
                 color: #633991;
             }

             .icon-bar {
                 position: fixed;
                 top: 50%;
                 -webkit-transform: translateY(-50%);
                 -ms-transform: translateY(-50%);
                 transform: translateY(-50%);
                 color:#337ab7;
             }

                 /* Style the icon bar links */
                 .icon-bar a {
                     display: block;
                     text-align: center;
                     padding: 16px;
                     transition: all 0.3s ease;
                     color: #faf6fb;
                     font-size: 20px;
                      background-color: #337ab7;
                 }

                     /* Style the social media icons with color, if you want */
                     .icon-bar a:hover {
                         background-color: #faf6fb;
                         color: #337ab7;
                     }
         }
     </style>
    <!-- The social media icon bar -->
<div class="icon-bar">
  <a href="#icanalert" class="nav-link"><i class="fa fa-bell" title="ICAN AlERT"></i></a> 
  <a href="#itinfra" class="nav-link"><i class=" fa fa-gears" title="IT INFRASTRUCTURE"></i></a> 
  <a href="#software" class="nav-link"><i class=" fa fa-laptop" title="SOFTWARE & APPLICATION"></i></a> 
  <a href="#outsources" class="nav-link"><i class=" fa fa-group" title="OUT SOURCES"></i></a>
 
</div>

    <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx"><asp:Label ID="Label3" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li><asp:Label ID="Label1" Text="<%$Resources:Resource,serviceandproduct %>" runat="server" /></li>
            </div>
        </div>
    </div>

    <section id="icanalert">
        <br />
    <div class="aboutus">
        <div class="container">
            <h2>Ican Alert</h2>
            <hr />
            <br />
            <div class="col-md-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
               <%-- <asp:HyperLink ID="hp1" CssClass="example-image-link" runat="server" data-lightbox="example-1" NavigateUrl="Content/images/Ican_Alert.jpg">
                <img src="Content/images/Ican_Alert.jpg" class="img-responsive" />
                    </asp:HyperLink>--%>
                 <asp:HyperLink ID="HyperLink1" CssClass="example-image-link" runat="server" data-lightbox="example-1" NavigateUrl="">
                <asp:Image ID="Image1" runat="server" CssClass="img-responsive" ImageUrl="" />
                     </asp:HyperLink>
            </div>
            <div class="col-md-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="skill">
                    <p class="indent pull-right">
                       <asp:Label ID="Label9" Text="<%$Resources:Resource,ias %>" runat="server" />
                    </p> 
                    <asp:LinkButton ID="LinkButton1" runat="server" OnClick="LinkButton1_Click"><u> <span class="fa fa-download" style="color:blue">   &nbsp; <asp:Label ID="Label10" Text="<%$Resources:Resource,dl_th %>" runat="server"  ForeColor="Blue"/></span></u> </asp:LinkButton>
                    <asp:LinkButton ID="LinkButton2" runat="server" OnClick="LinkButton2_Click" ><u> <span class="fa fa-download" style="color:blue">   &nbsp; <asp:Label ID="Label12" Text="<%$Resources:Resource,dl_en %>" runat="server"  ForeColor="Blue"/></span></u> </asp:LinkButton>
                </div>
            </div>
        </div><!--/.container-->
    </div>
    </section>
    <section id="itinfra">
        <br />
        <div class="aboutus">
        <div class="container">
            <h2 class="text-right">IT INFRASTRUCTURE</h2><hr />
            <br />
            <div class="col-md-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/IT_INFRASTRUCTURE.png" class="img-responsive" /> </div><div class="col-md-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="skill">
                    <p class="indent"><asp:Label ID="Label2" Text="<%$Resources:Resource,svif %>" runat="server" /> <a href="it_infrastructure.aspx" class="a"><asp:Label ID="Label4" Text="<%$Resources:Resource,readmore %>" runat="server" ForeColor="Blue"/></a></p>
                </div>
            </div>
        </div>
            </div>
        </section>
        <!--/.container-->
  
    <section id="software">
        <br />
    <div class="aboutus">
        <div class="container">
            <h2 class="text-left">SOFTWARE & APPLICATION</h2><hr />
            <br />
            <div class="col-md-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="skill">
                    <p class="<asp:Label ID="Label5" Text="<%$Resources:Resource,svap %>" runat="server" /> <a href="software_application.aspx" class="a"><asp:Label ID="Label6" Text="<%$Resources:Resource,readmore %>" runat="server"  ForeColor="Blue" /></a></p>
                </div>
            </div>
            <div class="col-md-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/softwhere.png" class="img-responsive" /> </div></div></div><!--/.container--></section><section id="outsources">
        <br />
        <div class="aboutus">
        <div class="container">
            <h2 class="text-right">OUT SOURCES</h2><hr />
            <br />
            <div class="col-md-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/outsource.png" class="img-responsive" /> </div><div class="col-md-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="skill">
                    <p class="indent"><asp:Label ID="Label7" Text="<%$Resources:Resource,svos %>" runat="server" /><a href="outsources.aspx" class="a"><asp:Label ID="Label8" Text="<%$Resources:Resource,readmore %>" runat="server"  ForeColor="Blue" /></a></p>
                </div>
            </div>
        </div>
        <!--/.container-->

    </div>
        </section>
    <!-- jQuery and Bootstrap -->
    <script src="Scripts/jquery-3.2.1.min.js"></script>
    <script src="Scripts/bootstrap.bundle.min.js"></script>
    <!-- Plugins JS -->
    <script src="Scripts/owl.carousel.min.js"></script>
    <!-- Custom JS -->
    <script src="Scripts/script.js"></script>

</asp:Content>
