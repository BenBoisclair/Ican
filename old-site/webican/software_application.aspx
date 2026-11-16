<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="software_application.aspx.cs" Inherits="webican.software_application" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">

    <style>
        * {
            box-sizing: border-box;
        }

        .mySlides {
            display: none;
        }

        img {
            vertical-align: middle;
        }

        /* Slideshow container */
        .slideshow-container {
            max-width: auto;
            position: relative;
            margin: auto;
        }

        /* Caption text */
        .text {
            color: #f2f2f2;
            font-size: 15px;
            padding: 8px 12px;
            position: absolute;
            bottom: 8px;
            width: 100%;
            text-align: center;
        }

        /* Number text (1/3 etc) */
        .numbertext {
            color: #f2f2f2;
            font-size: 12px;
            padding: 8px 12px;
            position: absolute;
            top: 0;
        }

        /* The dots/bullets/indicators */
        .dot {
            height: 15px;
            width: 15px;
            margin: 0 2px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 5.0s ease;
        }

        .active {
            background-color: #717171;
        }

        /* Fading animation */
        .fade {
            -webkit-animation-name: fade;
            -webkit-animation-duration: 4.5s;
            animation-name: fade;
            animation-duration: 4.5s;
        }

        @-webkit-keyframes fade {
            from {
                opacity: .5;
            }

            to {
                opacity: 5;
            }
        }

        @keyframes fade {
            from {
                opacity: .4;
            }

            to {
                opacity: 2;
            }
        }

        /* On smaller screens, decrease text size */
        @media only screen and (max-width: 300px) {
            .text {
                font-size: 11px;
            }
        }
    </style>



    <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx"><asp:Label ID="Label1" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li><a href="service_product.aspx"><asp:Label ID="Label2" Text="<%$Resources:Resource,serviceandproduct %>" runat="server" /></a></li>
                <li>Software &Application</li>
            </div>
        </div>
    </div>

    <div class="aboutus">
        <div class="container">
            <div class="center wow fadeInDown">
                <h1 class="text-center">ICAN</h1>
                <p><asp:Label ID="Label3" Text="<%$Resources:Resource,sw1 %>" runat="server" /></p>
                <h2>ICAN</h2>
                <p><asp:Label ID="Label4" Text="<%$Resources:Resource,sw2 %>" runat="server" /></p>
            </div>
        </div>
        <!--/.container-->
    </div>

    <div>
        <br />
    </div>

    <!--/.start slide-->
    <div class="container">
        <div class="slideshow-container">
            <div class="mySlides fade">
                <div class="numbertext">1 / 3</div>
                <img src="Content/images/Database.jpg" style="width: 100%" />
            </div>

            <div class="mySlides fade">
                <div class="numbertext">2 / 3</div>
                <img src="Content/images/design.jpg" style="width: 100%" />
            </div>

            <div class="mySlides fade">
                <div class="numbertext">3 / 3</div>
                <img src="Content/images/programing.jpg" style="width: 100%" />

            </div>

        </div>
    </div>
    <br>

    <div style="text-align: center">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
    <!--/.end slide-->


    <section id="partner">
        <div class="container">
            <div class="center wow fadeInDown">
                <h2>OUR SOFTWARE & APPLICATION LISTS</h2>
            </div>

        </div>
        <!--/.container-->
    </section>

    <div class="lates">
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a1.jpg" class="img-responsive" />
                <h3>WEB PORTAL</h3>
                <p class="indent">
                    <asp:Label ID="Label5" Text="<%$Resources:Resource,s1 %>" runat="server" />
                </p>
            </div>

            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                <img src="Content/images/a2.jpg" class="img-responsive" />
                <h3>CUSTOMER INFORMATION SYSTEM WEB APPLICATION</h3>
                <p class="indent">
                   <asp:Label ID="Label6" Text="<%$Resources:Resource,s2 %>" runat="server" />
                </p>
            </div>

            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                <img src="Content/images/a3.jpg" class="img-responsive" />
                <h3>TIME ATTENDANCE INTERFACE TO SAP</h3>
                <p class="indent">
                 <asp:Label ID="Label7" Text="<%$Resources:Resource,s3 %>" runat="server" />
                </p>
            </div>
        </div>

        <!-- แถว2-->
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a4.jpg" class="img-responsive" />
                <h3>MICROSITE</h3>
                <p class="indent"> <asp:Label ID="Label8" Text="<%$Resources:Resource,s4 %>" runat="server" /></p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a5.jpg" class="img-responsive" />
                <h3>SERVICE FORM</h3>
                <p class="indent">
                     <asp:Label ID="Label9" Text="<%$Resources:Resource,s5 %>" runat="server" />
                </p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a6.jpg" class="img-responsive" />
                <h3>EQUIPMENT HISTORY MANAGEMENT SYSTEM</h3>
                <p class="indent">
                    <asp:Label ID="Label10" Text="<%$Resources:Resource,s6 %>" runat="server" />
                </p>
            </div>
        </div>
        <!-- แถว3-->
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a7.jpg" class="img-responsive" />
                <h3>CLINIC APPLICATION</h3>
                <p class="indent"> <asp:Label ID="Label11" Text="<%$Resources:Resource,s7 %>" runat="server" /></p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a8.jpg" class="img-responsive" />
                <h3>DISTRIBUTORS INFORMATION SYSTEM - DISTRIBUTOR</h3>
                <p class="indent">
                     <asp:Label ID="Label12" Text="<%$Resources:Resource,s8 %>" runat="server" />
                </p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a9.jpg" class="img-responsive" />
                <h3>PRICE INFORMATION SYSTEM WEB APPLICATION</h3>
                <p class="indent">
                     <asp:Label ID="Label13" Text="<%$Resources:Resource,s9 %>" runat="server" />
                </p>
            </div>
        </div>
        <!-- แถว4-->
        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a10.jpg" class="img-responsive" />
                <h3>WEIGHBRIDGE INTERFACE APPLICATION</h3>
                <p class="indent"> <asp:Label ID="Label14" Text="<%$Resources:Resource,s10 %>" runat="server" /></p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a11.jpg" class="img-responsive" />
                <h3>DISTRIBUTORS INFORMATION SYSTEM- DATA WAREHOUSE</h3>
                <p class="indent">
                    <asp:Label ID="Label15" Text="<%$Resources:Resource,s11 %>" runat="server" />
                </p>
            </div>
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <img src="Content/images/a12.jpg" class="img-responsive" />
                <h3>CONTRACTOR MANAGEMENT SYSTEM</h3>
                <p class="indent">
                    <asp:Label ID="Label16" Text="<%$Resources:Resource,s12 %>" runat="server" />
                </p>
            </div>
        </div>
    </div>


    <!-- แถว5-->
    <div class="container">
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a13.jpg" class="img-responsive" />
            <h3>INFRASTRUCTURE AND MAINTENANCE DEPARTMENT</h3>
            <p class="indent"><asp:Label ID="Label17" Text="<%$Resources:Resource,s13 %>" runat="server" /></p>
        </div>
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a14.jpg" class="img-responsive" />
            <h3>E – VOTING SYSTEM</h3>
            <p class="indent">
            <asp:Label ID="Label18" Text="<%$Resources:Resource,s14 %>" runat="server" />
            </p>
        </div>
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a15.jpg" class="img-responsive" />
            <h3>AFR DATABASE</h3>
            <p class="indent">
               <asp:Label ID="Label19" Text="<%$Resources:Resource,s15 %>" runat="server" />
            </p>
        </div>
    </div>
    <!-- แถว6-->
    <div class="container">
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a16.jpg" class="img-responsive" />
            <h3>SALES TOOLS</h3>
            <p class="indent"><asp:Label ID="Label20" Text="<%$Resources:Resource,s16 %>" runat="server" /> </p>
           
        </div>
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a17.jpg" class="img-responsive" />
            <h3>E-UNIFORM ONLINE</h3>
            <p class="indent">
                <asp:Label ID="Label21" Text="<%$Resources:Resource,s17 %>" runat="server" />
            </p>
          


        </div>
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a18.jpg" class="img-responsive" />
            <h3>KNOWLEDGE MANAGEMENT SYSTEM</h3>
            <p class="indent">
                <asp:Label ID="Label22" Text="<%$Resources:Resource,s18 %>" runat="server" />
            </p>
           
        </div>
    </div>
    <!-- แถว7-->
    <div class="container">
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a19.jpg" class="img-responsive" />
            <h3>CUSTOMER TECHNICAL SERVICES DEPARTMENT</h3>
            <p class="indent"><asp:Label ID="Label23" Text="<%$Resources:Resource,s19 %>" runat="server" /></p>
        </div>
        <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
            <img src="Content/images/a20.jpg" class="img-responsive" />
            <h3>HELPDESK MANAGEMENT SYSTEM</h3>
            <p class="indent">
                <asp:Label ID="Label24" Text="<%$Resources:Resource,s20 %>" runat="server" />


            </p>
        </div>

    </div>


    <div class="container">
        

    </div>

    <!-- script-->
    <script>
        var slideIndex = 0;
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
            setTimeout(showSlides, 4000); // Change image every 2 seconds
        }
    </script>
</asp:Content>
