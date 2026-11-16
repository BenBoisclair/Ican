<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="about.aspx.cs" Inherits="webican.about" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
    <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
              
                <li><a href="home.aspx">
                    <asp:Label ID="Label3" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li>
                    <asp:Label ID="Label1" Text="<%$Resources:Resource,about %>" runat="server" /></li>
                    
            </div>
        </div>
    </div>

    <div class="aboutus">
        <div class="container">
            <h2>
                <asp:Label ID="Label2" Text="<%$Resources:Resource,about %>" runat="server" /><i class="fa fa-user-circle-o"></i></h2>
            <hr />
            <br />
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/about.jpg" class="img-responsive" />
            </div>
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <div class="skill">
                    <h2>
                        <asp:Label ID="Label4" Text="<%$Resources:Resource, about_title %>" runat="server" Font-Bold="true" /></h2>
                    <div class="text-justify">
                        <p class="indent">
                            <asp:Label ID="Label5" Text="<%$Resources:Resource, about_title1 %>" runat="server" /></p>

                        <p class="indent">
                            <asp:Label ID="Label6" Text="<%$Resources:Resource, about_title2 %>" runat="server" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="aboutus">
        <div class="container">
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="skill">
                    <div class="text-justify">
                        <p class="indent">
                            <asp:Label ID="Label7" Text="<%$Resources:Resource, about_title3 %>" runat="server" />
                        </p>
                        <p class="indent">
                            <asp:Label ID="Label8" Text="<%$Resources:Resource, about_title4 %>" runat="server" />
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <img src="Content/images/picture/ibusiness.JPG" class="img-responsive" />

            </div>
        </div>
    </div>

    <div class="our-team">
        <div class="container">
            <div class="text-center">
                <h1>
                    <asp:Label ID="Label10" Text="<%$Resources:Resource, kib %>" runat="server" /></h1>
            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p class="indent">
                        <asp:Label ID="Label9" Text="<%$Resources:Resource, kib1 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label11" Text="<%$Resources:Resource, kib2 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label12" Text="<%$Resources:Resource, kib3 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label13" Text="<%$Resources:Resource, kib4 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label14" Text="<%$Resources:Resource, kib5 %>" runat="server" /></p>


                </div>
            </div>
        </div>
    </div>

    <div class="aboutus">
        <div class="container">
            <div class="text-center">
                <h1>
                    <asp:Label ID="Label15" Text="<%$Resources:Resource, whyican %>" runat="server" /></h1>
            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label16" Text="<%$Resources:Resource, whyican1 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label17" Text="<%$Resources:Resource, whyican2 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label18" Text="<%$Resources:Resource, whyican3 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label19" Text="<%$Resources:Resource, whyican4 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label20" Text="<%$Resources:Resource, whyican5 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label21" Text="<%$Resources:Resource, whyican6 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label24" Text="<%$Resources:Resource, whyican7 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label23" Text="<%$Resources:Resource, whyican8 %>" runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label22" Text="<%$Resources:Resource, whyican9 %>" runat="server" /></p>


                </div>
            </div>
        </div>
    </div>
</asp:Content>
