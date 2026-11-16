<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="contact_us.aspx.cs" Inherits="webican.contact_us" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
    <style>
        .text-center p {
    margin-bottom: 2px;
    color: #333;
}
    </style>
    <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx">
                    <asp:Label ID="Label1" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li>
                    <asp:Label ID="Label2" Text="<%$Resources:Resource,contact %>" runat="server" /></li>
            </div>
        </div>
    </div>
    <div class="feature">
        <div class="container">
            <div class="text-center">
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                        <i class="fa fa-home"></i>
                        <h2>
                            <asp:Label ID="Label3" Text="<%$Resources:Resource,cm %>" runat="server" /></h2>
                        <p>
                            <asp:Label ID="Label4" Text="<%$Resources:Resource,welcome2 %>" runat="server" />
                        </p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                        <i class="fa fa-phone"></i>
                        <h2>
                            <asp:Label ID="Label5" Text="<%$Resources:Resource,tol %>" runat="server" /></h2>
                        <p>
                            <asp:Label ID="Label6" Text="<%$Resources:Resource,tol1 %>" runat="server" /><br />
                            <asp:Label ID="Label7" Text="<%$Resources:Resource,tol2 %>" runat="server" /><br />
                            <asp:Label ID="Label8" Text="<%$Resources:Resource,tol3 %>" runat="server" />
                        </p>

                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                        <i class="fa fa-tags"></i>
                        <h2>
                            <asp:Label ID="Label9" Text="<%$Resources:Resource,ad %>" runat="server" /></h2>
                        <p>
                            <asp:Label ID="Label10" Text="<%$Resources:Resource,ad1 %>" runat="server" />
                            <br />
                            <asp:Label ID="Label11" Text="<%$Resources:Resource,ad2 %>" runat="server" />
                        </p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="1200ms">
                        <i class="	fa fa-envelope"></i>
                        <h2>
                            <asp:Label ID="Label12" Text="<%$Resources:Resource,em %>" runat="server" /></h2>
                        <center>
                        <p> Email: websupport@ican.co.th</p><p>Line ID : @ican-group</p>
                    <a href="https://line.me/R/ti/p/%40ican-group" target="_blank"><asp:Image ID="bgrimmgrop" runat="server" ImageUrl="Content/images/QR.jpg" Width="150px" />           
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="our-team">
        <div class="text-center">
            <h1>
                <asp:Label ID="Label13" Text="<%$Resources:Resource,lc %>" runat="server" /></h1>
        </div>
        <div class="container">
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <%--<img src="Content/images/Map-Thai.jpg" class="img-responsive" />--%>
                <%-- <a class="example-image-link" href="Content/images/Map-Thai.png" data-lightbox="example-1">
                <img class="example-image img-responsive" src="Content/images/Map-Thai.png" alt="image-1" style="width: 100%;" /></a>--%>
               <%-- <a class="example-image-link" href="Content/images/Map-Thai.png" data-lightbox="example-1"></a>--%>
                    <asp:HyperLink ID="hp1" CssClass="example-image-link" runat="server" data-lightbox="example-1" NavigateUrl="">
                <asp:Image ID="Image1" runat="server" CssClass="img-responsive" ImageUrl="" />
                     </asp:HyperLink>
                <%--<a class="example-image-link"  href="Content/images/Map-Eng.png" data-lightbox="example-1" id="link1">--%>
               
            </div>
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.6050525059854!2d100.55697251452652!3d13.802666090314549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29c4767f43829%3A0xafc0657d3b001659!2sIcan!5e0!3m2!1sth!2sus!4v1524647644495&language=ru" style="border: 0; padding-top: 30px; width: 100%; height: 455px" id="ifame1"></iframe>

            </div>
        </div>

    </div>


</asp:Content>
