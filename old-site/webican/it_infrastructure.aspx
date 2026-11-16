<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="it_infrastructure.aspx.cs" Inherits="webican.it_infrastructure" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
    <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx"><asp:Label ID="Label3" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li><a href="service_product.aspx"><asp:Label ID="Label1" Text="<%$Resources:Resource,serviceandproduct %>" runat="server" /></a></li>
                <li>IT Infrastructure</li>
            </div>
        </div>
    </div>

    <div class="aboutus">
        <div class="container">
            <div class="center wow fadeInDown">
                <h1 class="text-center">ICAN</h1>
                <p><asp:Label ID="Label2" Text="<%$Resources:Resource,itif1 %>" runat="server" /></p>
                <h2><asp:Label ID="Label4" Text="<%$Resources:Resource,itif2 %>" runat="server" /></h2>
                <p><asp:Label ID="Label5" Text="<%$Resources:Resource,itif3 %>" runat="server" /></p>
                <h2><asp:Label ID="Label6" Text="<%$Resources:Resource,itif4 %>" runat="server" /></h2>
                <p><asp:Label ID="Label7" Text="<%$Resources:Resource,itif5 %>" runat="server" /></p>
            </div>
        </div>
        <!--/.container-->
    </div>
    <section id="partner">
        <div class="container">
            <div class="center wow fadeInDown">
                <h2>OUR INFRASTRUCTURE</h2>
            </div>

        </div>
        <!--/.container-->
    </section>

    <div class="lates">
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i1.jpg" class="img-responsive" />
                <h3>DATA CENTER</h3>
                <p class="indent"><asp:Label ID="Label8" Text="<%$Resources:Resource,i1 %>" runat="server" />
                </p>
            </div>

            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <img src="Content/images/i2.jpg" class="img-responsive" />
                <h3>SERVER AND PC</h3>
                <p class="indent"><asp:Label ID="Label9" Text="<%$Resources:Resource,i4 %>" runat="server" />
                </p>
            </div>

            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                <img src="Content/images/i3.jpg" class="img-responsive" />
                <h3>POWER SUPPLY</h3>
                <p class="indent">
                   <asp:Label ID="Label10" Text="<%$Resources:Resource,i5 %>" runat="server" />
                </p>
            </div>
        </div>

        <!-- แถว2-->
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i4.jpg" class="img-responsive" />
                <h3>CCTV SYSTEM</h3>
                <p class="indent"><asp:Label ID="Label11" Text="<%$Resources:Resource,i6 %>" runat="server" /></p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i5.jpg" class="img-responsive" />
                <h3>IP PHONE SYSTEM</h3>
                <p class="indent">
                    <asp:Label ID="Label12" Text="<%$Resources:Resource,i7 %>" runat="server" />
                </p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i6.jpg" class="img-responsive" />
                <h3>NETWORK INFRASTRUCTURE</h3>
                <p class="indent">
                    <asp:Label ID="Label13" Text="<%$Resources:Resource,i2 %>" runat="server" />
                </p>
            </div>
        </div>
        <!-- แถว3-->
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i7.jpg" class="img-responsive" />
                <h3>NETWORK EQUIPMENT</h3>
                <p class="indent"><asp:Label ID="Label14" Text="<%$Resources:Resource,i3 %>" runat="server" /></p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i8.jpg" class="img-responsive" />
                <h3>VIDEO CONFERENCE SYSTEM</h3>
                <p class="indent">
                    <asp:Label ID="Label15" Text="<%$Resources:Resource,i10 %>" runat="server" />


                </p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i9.jpg" class="img-responsive" />
                <h3>ACCESS CONTROL</h3>
                <p class="indent">
                    <asp:Label ID="Label16" Text="<%$Resources:Resource,i11 %>" runat="server" />
                </p>
            </div>
        </div>
        <!-- แถว4-->
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i10.jpg" class="img-responsive" />
                <h3>ICAN ALERT</h3>
                <p class="indent"><asp:Label ID="Label17" Text="<%$Resources:Resource,i9 %>" runat="server" /></p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/i11.jpg" class="img-responsive" />
                <h3>FIRE EXTINGUISHER SYSTEM</h3>
                <p class="indent">
                    <asp:Label ID="Label18" Text="<%$Resources:Resource,i8 %>" runat="server" />
                </p>
            </div>

        </div>


    </div>


</asp:Content>
