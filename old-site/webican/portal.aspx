<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="portal.aspx.cs" Inherits="webican.purtol" %>
<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
        <script>
        $(function () {
            var overlay = $('<div id="overlay"></div>');
            overlay.show();
            overlay.appendTo(document.body);
            $('.popup').show();
            $('.close').click(function () {
                $('.popup').hide();
                overlay.appendTo(document.body).remove();
                return false;
            });

            $('.x').click(function () {
                $('.popup').hide();
                overlay.appendTo(document.body).remove();
                return false;
            });
        });
    </script>

      <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx">
                    <asp:Label ID="Label3" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li>
                    <asp:Label ID="Label1" Text="<%$Resources:Resource,foremp %>" runat="server" /></li>
            </div>
        </div>
    </div>
    <section id="partner">
        <div class="container">
            <div class="center wow fadeInDown">
                <h2><asp:Label ID="Label2" Text="Application For Employee" runat="server" /></h2>
            </div>
        </div>
    </section>
    
    <div class="feature">
        <div class="container">
            <div class="text-center">
                <div class="col-md-4">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                        <a href="http://icanservice.ican.co.th/" target="_blank"><i class="fa fa-cogs"></i>
                            <h2>ICAN SERVICE</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                        <a href="https://webmail.ican.co.th/" target="_blank" ><i class="fa fa-envelope"></i>
                            <h2>WEB MAIL</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                        <a href="http://assetbooking.ican.co.th/"  target="_blank"><i class="fa fa-book"></i>
                            <h2>ASSET BOOKING</h2>
                        </a>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
    <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br /> <br /> <br /> <br />
     <br />
     <br />
     <br />
</asp:Content>
