<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="webican.Index" %>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <link href="Content/images/slider/thumbs2.css" rel="stylesheet" />
    <link href="Content/images/slider/thumbnail-slider.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <script src="Content/images/slider/thumbnail-slider.js" type="text/javascript"></script>
    <script src="Content/js/jquery-1.11.3.min.js" type="text/javascript"></script>
    <script src="Content/js/jssor.slider-27.5.0.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        /*Modal popup image Edit by ART 08/05/2562*/
        $(document).ready(function(){
            var modal = document.getElementById('modal01');
            modal.style.display = "block";
        });

        jQuery(document).ready(function ($) {

            var jssor_1_options = {
              $AutoPlay: 1,
              $AutoPlaySteps: 5,
              $SlideDuration: 160,
              $SlideWidth: 200,
              $SlideSpacing: 3,
              $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$,
                $Steps: 5
              },
              $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$
              }
            };

            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

            /*#region responsive code begin*/

            var MAX_WIDTH = 980;

            function ScaleSlider() {
                var containerElement = jssor_1_slider.$Elmt.parentNode;
                var containerWidth = containerElement.clientWidth;

                if (containerWidth) {

                    var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

                    jssor_1_slider.$ScaleWidth(expectedWidth);
                }
                else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }

            ScaleSlider();

            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            /*#endregion responsive code end*/
        });
    </script>
    <style>
        /*Modal popup image Edit by ART 08/05/2562*/
        .w3-modal-content {
          margin-top: 40px;
          width: 70%;
        }

        /*Modal popup image Edit by ART 08/05/2562*/
        /* Add Animation */
        .w3-modal-content {  
          -webkit-animation-name: zoom;
          -webkit-animation-duration: 1.5s;
          animation-name: zoom;
          animation-duration: 1.5s;
        }

        /*Modal popup image Edit by ART 08/05/2562*/
        @-webkit-keyframes zoom {
          from {-webkit-transform:scale(0)} 
          to {-webkit-transform:scale(1)}
        }

        /*Modal popup image Edit by ART 08/05/2562*/
        @keyframes zoom {
          from {transform:scale(0)} 
          to {transform:scale(1)}
        }

        /*jssor slider loading skin spin css*/
        .jssorl-009-spin img {
            animation-name: jssorl-009-spin;
            animation-duration: 1.6s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        @keyframes jssorl-009-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /*jssor slider bullet skin 057 css*/
        .jssorb057 .i {position:absolute;cursor:pointer;}
        .jssorb057 .i .b {fill:none;stroke:#fff;stroke-width:2000;stroke-miterlimit:10;stroke-opacity:0.4;}
        .jssorb057 .i:hover .b {stroke-opacity:.7;}
        .jssorb057 .iav .b {stroke-opacity: 1;}
        .jssorb057 .i.idn {opacity:.3;}

        /*jssor slider arrow skin 073 css*/
        .jssora073 {display:block;position:absolute;cursor:pointer;}
        .jssora073 .a {fill:#ddd;fill-opacity:.7;stroke:#000;stroke-width:160;stroke-miterlimit:10;stroke-opacity:.7;}
        .jssora073:hover {opacity:.8;}
        .jssora073.jssora073dn {opacity:.4;}
        .jssora073.jssora073ds {opacity:.3;pointer-events:none;}
    </style>
    <section id="main-slider" class="no-margin">
        <div class="carousel slide">
            
            <div class="carousel-inner">
               
                <div class="item active" style="background-image: url(Content/images/bg_ican.png)">
                    <div class="container">
                        <div class="row slide-margin">
                            <div class="col-sm-80">
                                <div class="carousel-content">
                                    <h2 class="animation animated-item-1"></h2>
                                      <%--  <asp:Label ID="Label1" Text="<%$Resources:Resource,welcome %>" runat="server" Font-Bold="true" />
                                        </h2>
                                    <p class="animation animated-item-2"> <asp:Label ID="Label2" Text="<%$Resources:Resource,welcome2 %>" runat="server" /></p>--%>
                                    <%--<a class="btn-slide animation animated-item-3" href="#">Read More</a>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/.item-->
            </div>
            <!--/.carousel-inner-->
        </div>
        <!--/.carousel-->
    </section>
    <!--/#main-slider-->
    
    <div class="feature">
        <div class="container">
            <div class="text-center">
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                        <a href="it_infrastructure.aspx"><i class="fa fa-book"></i>
                            <h2>IT INFRASTRUCTURE</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                        <a href="software_application.aspx"><i class="fa fa-laptop"></i>
                            <h2>SOFTWARE & APPLICATION</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                        <a href="outsources.aspx"><i class="fa fa-users"></i>
                            <h2>OUTSOURCES</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="1200ms">
                        <a href="service_product.aspx"><i class="fa fa-cogs"></i>
                            <h2>OUR SERVICES & PRODUCT</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="about">
        <div class="container">
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/about.jpg" class="img-responsive" />
            </div>
            <div class="col-md-6 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <h2><asp:Label ID="Label3" Text="<%$Resources:Resource,about %>" runat="server" Font-Bold="true" /></h2>
                <h3><asp:Label ID="Label4" Text="<%$Resources:Resource,about_title %>" runat="server"  /></h3>
                <p class="indent"><asp:Label ID="Label5" Text="<%$Resources:Resource,about_title1 %>" runat="server"  />
                </p>
                <p class="indent"><asp:Label ID="Label7" Text="<%$Resources:Resource,about_title2 %>" runat="server"  />
                
                <a href="about.aspx" class="a"><asp:Label ID="Label6" Text="<%$Resources:Resource,readmore %>" runat="server" ForeColor="Blue" BackColor="Window"/></a></p>
            </div>
        </div>
    </div>
    <div class="aboutus">
        <div class="container">
            <div class="text-center">
                <h1><asp:Label ID="Label15" Text="<%$Resources:Resource, whyican %>"  runat="server" /></h1>
            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label16" Text="<%$Resources:Resource, whyican1 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label17" Text="<%$Resources:Resource, whyican2 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label18" Text="<%$Resources:Resource, whyican3 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label19" Text="<%$Resources:Resource, whyican4 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label20" Text="<%$Resources:Resource, whyican5 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label21" Text="<%$Resources:Resource, whyican6 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label24" Text="<%$Resources:Resource, whyican7 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label23" Text="<%$Resources:Resource, whyican8 %>"  runat="server" /></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label22" Text="<%$Resources:Resource, whyican9 %>"  runat="server" /></p>


                </div>
            </div>
        </div>
    </div>

    <section id="partner">
        <div class="container">
            <div class="center wow fadeInDown">
                <h2>OUR CUSTOMER</h2>
            </div>
            <br />
            

           <!--start-->
           <div id="jssor_1" style="position:relative;margin:0 auto;top:0px;left:0px;width:980px;height:150px;overflow:hidden;visibility:hidden;">
        <!-- Loading Screen -->
        <div data-u="loading" class="jssorl-009-spin" style="position:absolute;top:0px;left:0px;width:100%;height:100%;text-align:center;background-color:rgba(0,0,0,0.7);">
            <img style="margin-top:-19px;position:relative;top:50%;width:38px;height:38px;" src="Content/images/partners/spin.svg" />
        </div>
        <div data-u="slides" style="cursor:default;position:relative;top:0px;left:0px;width:980px;height:150px;overflow:hidden;">
            <div>
              <a href="http://www.bgrimmgroup.com/" target="_blank"><asp:Image ID="bgrimmgrop" runat="server" ImageUrl="Content/images/partners/C001.jpg" class="thumb" /></a>
            </div>
            <div>
                 <a href="http://www.siamcitycement.com/" target="_blank"><asp:Image ID="siamcitycement" runat="server" ImageUrl="Content/images/partners/C002.png" class="thumb" /></a>
            </div>
            <div>
               <a href="http://th.luckyrl.com/" target="_blank"><asp:Image ID="luckyrl" runat="server" ImageUrl="Content/images/partners/C003.png" class="thumb" /></a>
            </div>
            <div>
            <a href="http://www.merck.co.th/" target="_blank"><asp:Image ID="C004" runat="server" ImageUrl="Content/images/partners/C004.png" class="thumb" /></a>
            </div>
            <div>
               <a href="http://www.lyreco.com/" target="_blank"><asp:Image ID="C005" runat="server" ImageUrl="Content/images/partners/C005.png" class="thumb" /></a>
            </div>
            <div>
                <a href="http://www.jacto.com.br/" target="_blank"><asp:Image ID="C007" runat="server" ImageUrl="Content/images/partners/C007.jpg" class="thumb" /></a>
            </div>
            <div>
                 <a href="http://www.7eleven.co.th/" target="_blank"><asp:Image ID="C009" runat="server" ImageUrl="Content/images/partners/C009.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://www.egco.com/" target="_blank"><asp:Image ID="C011" runat="server" ImageUrl="Content/images/partners/C011.png" class="thumb" /></a>
            </div>
            <div>
                 <a href="http://www.who.int/" target="_blank"><asp:Image ID="C013" runat="server" ImageUrl="Content/images/partners/C013.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://www.pttict.com/" target="_blank"><asp:Image ID="C015" runat="server" ImageUrl="Content/images/partners/C015.png" class="thumb" /></a>
            </div>
            <div>
            <a href="http://www.lorealthailand.com/" target="_blank"><asp:Image ID="C016" runat="server" ImageUrl="Content/images/partners/C016.png" class="thumb" /></a>
            </div>
            <div>
                 <a href="http://www.conwood.co.th/" target="_blank"><asp:Image ID="C017" runat="server" ImageUrl="Content/images/partners/C017.png" class="thumb" /></a>
               <%-- <img data-u="image" src="img/027.jpg" />--%>
            </div>
            <div>
           <a href="http://www.cmg.co.th/" target="_blank"><asp:Image ID="C018" runat="server" ImageUrl="Content/images/partners/C018.png" class="thumb" /></a>
            </div>
            <div>
           <a href="https://th.usembassy.gov/th/" target="_blank"><asp:Image ID="C021" runat="server" ImageUrl="Content/images/partners/C021.png" class="thumb" /></a>
            </div>
            <div>
            <a href="https://www.bot.or.th" target="_blank"><asp:Image ID="C023" runat="server" ImageUrl="Content/images/partners/C023.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://www.pttplc.com/" target="_blank"><asp:Image ID="C024" runat="server" ImageUrl="Content/images/partners/C024.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://www.holcim.com/" target="_blank"><asp:Image ID="C026" runat="server" ImageUrl="Content/images/partners/C026.png" class="thumb" /></a>
            </div>
            <div>
            <a href="http://www.magotteaux.com/" target="_blank"><asp:Image ID="C028" runat="server" ImageUrl="Content/images/partners/C028.png" class="thumb" /></a>
            </div>
            <div>
            <a href="http://www.cpfworldwide.com/" target="_blank"><asp:Image ID="C031" runat="server" ImageUrl="Content/images/partners/C031.png" class="thumb" /></a>
            </div>
            <div>
            <a href="http://www.dextragroup.com/" target="_blank"><asp:Image ID="C032" runat="server" ImageUrl="Content/images/partners/C032.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://www.tencate.com/" target="_blank"><asp:Image ID="C034" runat="server" ImageUrl="Content/images/partners/C034.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://www.fec-corp.com/" target="_blank"><asp:Image ID="C035" runat="server" ImageUrl="Content/images/partners/C035.png" class="thumb" /></a>
            </div>
            <div>
             <a href="http://ovaltine.co.th/" target="_blank"><asp:Image ID="C036" runat="server" ImageUrl="Content/images/partners/C036.png" class="thumb" /></a>
                </div>
                <div>
             <a href="http://www.beko.co.th/" target="_blank"><asp:Image ID="C037" runat="server" ImageUrl="Content/images/partners/C037.png" class="thumb" /></a>
            </div>
                   <div>
              <a href="http://www.ubonbioethanol.com" target="_blank"><asp:Image ID="C038" runat="server" ImageUrl="Content/images/partners/ubon.png" class="thumb" /></a>
            </div>
                   <div>
            <a href="http://www.nielsen.com/" target="_blank"><asp:Image ID="C039" runat="server" ImageUrl="Content/images/partners/C039.png" class="thumb" /></a>
            </div>
                   <div>
            <a href="http://www.meadjohnson.com" target="_blank"><asp:Image ID="C040" runat="server" ImageUrl="Content/images/partners/C040.png" class="thumb" /></a>
            </div>
                   <div>
             <a href="http://www.redbull.com" target="_blank"><asp:Image ID="C041" runat="server" ImageUrl="Content/images/partners/C041.png" class="thumb" /></a>
            </div>
                   <div>
               <a href="http://www.x-speed.co.th/" target="_blank"><asp:Image ID="C042" runat="server" ImageUrl="Content/images/partners/C042.png" class="thumb" /></a>
            </div>
                   <div>
              <a href="http://www.sharpthai.co.th"  target="_blank"><asp:Image ID="C043" runat="server" ImageUrl="Content/images/partners/C043.png" class="thumb" /></a>
            </div>
                   <div>
             <a href="http://soiha.com/" target="_blank" ><asp:Image ID="C044" runat="server" ImageUrl="Content/images/partners/C044.png" class="thumb" /></a>
            </div>
                   <div>
                <a href="http://www.teamgroup.co.th/" target="_blank" ><asp:Image ID="C045" runat="server" ImageUrl="Content/images/partners/C045.png" class="thumb" /></a>
            </  div>
            
         
        </div>
        <!-- Bullet Navigator -->
     <%--   <div id="navigator" class="jssorb057" style="position:absolute;bottom:12px;right:12px;" data-autocenter="1" data-scale="0.5" data-scale-bottom="0.75">
            <div id="prototype" class="i" style="width:16px;height:16px;">
                <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                    <circle class="b" cx="8000" cy="8000" r="5000"></circle>
                </svg>
            </div>
        </div>--%>
        <!-- Arrow Navigator -->
   <%--     <div data-u="arrowleft" class="jssora073" style="width:50px;height:50px;top:0px;left:30px;" data-autocenter="2" data-scale="0.75" data-scale-left="0.75">
            <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                <path class="a" d="M4037.7,8357.3l5891.8,5891.8c100.6,100.6,219.7,150.9,357.3,150.9s256.7-50.3,357.3-150.9 l1318.1-1318.1c100.6-100.6,150.9-219.7,150.9-357.3c0-137.6-50.3-256.7-150.9-357.3L7745.9,8000l4216.4-4216.4 c100.6-100.6,150.9-219.7,150.9-357.3c0-137.6-50.3-256.7-150.9-357.3l-1318.1-1318.1c-100.6-100.6-219.7-150.9-357.3-150.9 s-256.7,50.3-357.3,150.9L4037.7,7642.7c-100.6,100.6-150.9,219.7-150.9,357.3C3886.8,8137.6,3937.1,8256.7,4037.7,8357.3 L4037.7,8357.3z"></path>
            </svg>
        </div>
        <div data-u="arrowright" class="jssora073" style="width:50px;height:50px;top:0px;right:30px;" data-autocenter="2" data-scale="0.75" data-scale-right="0.75">
            <svg viewbox="0 0 16000 16000" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                <path class="a" d="M11962.3,8357.3l-5891.8,5891.8c-100.6,100.6-219.7,150.9-357.3,150.9s-256.7-50.3-357.3-150.9 L4037.7,12931c-100.6-100.6-150.9-219.7-150.9-357.3c0-137.6,50.3-256.7,150.9-357.3L8254.1,8000L4037.7,3783.6 c-100.6-100.6-150.9-219.7-150.9-357.3c0-137.6,50.3-256.7,150.9-357.3l1318.1-1318.1c100.6-100.6,219.7-150.9,357.3-150.9 s256.7,50.3,357.3,150.9l5891.8,5891.8c100.6,100.6,150.9,219.7,150.9,357.3C12113.2,8137.6,12062.9,8256.7,11962.3,8357.3 L11962.3,8357.3z"></path>
            </svg>
        </div>--%>
    </div>
                </div>
        <!--/.container-->
    </section>
    <!--/#partner-->

    <section id="conatcat-info">
        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <div class="media contact-info wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                        <div class="pull-left">
                            <i class="fa fa-phone"></i>
                        </div>
                        <div class="media-body">
                            <h2>ICAN</h2>
                            <p>
                                <asp:Label ID="Label8" Text="<%$Resources:Resource, about_title %>"  runat="server" />
                                <br />
                               <asp:Label ID="Label9" Text="<%$Resources:Resource, ad1 %>"  runat="server" />
                                <asp:Label ID="Label10" Text="<%$Resources:Resource, ad2 %>"  runat="server" />
                                <br />
                                <asp:Label ID="Label11" Text="<%$Resources:Resource, tol1 %>"  runat="server" /> 
                                <asp:Label ID="Label12" Text="<%$Resources:Resource, tol2 %>"  runat="server" /><br />
                                <asp:Label ID="Label1" Text="Line ID : @ican-group"  runat="server" />
                            </p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 pull-left">
                     <div class="media contact-info wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                    <asp:Image ID="Image1" runat="server" ImageUrl="Content/images/QR.jpg" Width="150px" />  
                      </div>
                </div>
            </div>
        </div>
        <!--/.container-->
    </section>
    <!--/#conatcat-info-->

    <!--Modal popup image Edit by ART 08/05/2562-->
    <div id="modal01" class="w3-modal" onclick="this.style.display='none'">
        <div class="w3-modal-content w3-animate-zoom">
            <img src="Content/images/home_popup.jpg" style="width:100%;padding-bottom: 5px;padding-left: 5px;padding-top: 5px;padding-right: 5px;" />
        </div>
    </div>

     <script>
                        //Note: this script should be placed at the bottom of the page, or after the slider markup. It cannot be placed in the head section of the page.
                        var thumbs1 = document.getElementById("thumbnail-slider");
                        var thumbs2 = document.getElementById("thumbs2");
                        var closeBtn = document.getElementById("closeBtn");
                        var slides = thumbs1.getElementsByTagName("li");
                        for (var i = 0; i < slides.length; i++) {
                            slides[i].index = i;
                            slides[i].onclick = function (e) {
                                var li = this;
                                var clickedEnlargeBtn = false;
                                if (e.offsetX > 220 && e.offsetY < 25) clickedEnlargeBtn = true;
                                if (li.className.indexOf("active") != -1 || clickedEnlargeBtn) {
                                    thumbs2.style.display = "block";
                                    mcThumbs2.init(li.index);
                                }
                            };
                        }

                        thumbs2.onclick = closeBtn.onclick = function (e) {
                            //This event will be triggered only when clicking the area outside the thumbs or clicking the CLOSE button
                            thumbs2.style.display = "none";
                        };
                    </script>

</asp:Content>
