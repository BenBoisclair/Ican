<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="join_us.aspx.cs" Inherits="webican.join_us" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">
    <!-- Latest compiled and minified CSS -->
    <script src="Scripts/jquery-1.10.2.js"></script>
    
    <style type="text/css">
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            filter: alpha(opacity=70);
            -moz-opacity: 0.7;
            -khtml-opacity: 0.7;
            opacity: 0.7;
            z-index: 100;
            display: none;

        }

        .popup {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            display: none;
            position: fixed;
            z-index: 101;
            background-color: #696b6b87;
        }
           .popup1 {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            display: none;
            position: fixed;
            z-index: 101;
            background-color: #696b6b87;
            /*overflow : auto ;*/ 
          
        }
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
        }
    </style>

    <div class='popup'>
        <br />
        <br />
        <br />
        <br />
        <div class="modal-dialog">
            <div class="modal-content">
               <%-- <div class=" text-right">
                    <img src="Content/x.png" style="width: 40px" alt='quit' class='x' id='x' />
                </div>--%>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group">
                                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h3 class="modal-title text-center"><b>ประกาศรับสมัครพนักงานฝ่ายช่างเทคนิค</b></h3>
                </div>
                <div class="modal-body">
                    <p><u><b>รายละเอียดผู้สมัคร</b></u></p>
                    <h5 style=" text-indent: 50px;">-จบการศึกษาระดับ ปวช ขึ้นไป</h5>
                    <h5 style=" text-indent: 50px;">-เพศชาย</h5>            
                    <h5 style=" text-indent: 50px;">-งานประจำ เริ่มงาน 8:00 – 17:00 วันจันทร์ – วันศุกร์</h5>
                    <h5 style=" text-indent: 50px;">-เงินเดือน ตามที่ตกลง</h5>
                    <p><u><b>คุณสมบัติของผู้สมัคร</b></u></p>
                    <h5 style=" text-indent: 50px;">-เรียนรู้ได้อย่างรวดเร็ว มนุษยสัมพันธ์ดีและสื่อสารได้อย่างเข้าใจ</h5>
                    <h5 style=" text-indent: 50px;">-มีความรู้ความเชี่ยวชาญด้านงานช่าง</h5>
                    <h5 style=" text-indent: 50px;">-จบสาขา อิเล็คทรอนิค หรือ ไฟฟ้า จะพิจารณาเป็นพิเศษ</h5>
                  <h6 style=" text-indent: 50px;" class="close">ตำแหน่งงานอื่น ๆ</h6>
                </div>
                        </div>
                    </div>
                    <br />

                </div>
            </div>
        </div>
    </div>

   

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
                    <asp:Label ID="Label1" Text="<%$Resources:Resource,job %>" runat="server" /></li>
            </div>
        </div>
    </div>

    <section id="partner">
        <div class="container" style="height:10px">
            <div class="center wow fadeInDown">
                <h2>
                    <asp:Label ID="Label2" Text="<%$Resources:Resource,job1 %>" runat="server" /></h2>
                <p>
                    <asp:Label ID="Label4" Text="<%$Resources:Resource,job2 %>" runat="server" />
                </p>
            </div>


        </div>
        <!--/.container-->
    </section>
    <!--/#partner-->

        <div class="feature">
        <div class="container">
            <div class="text-center">
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">   
                        
                  
                        <a class="nav-link" href="#network">
                        <i class="fa fa-signal"></i>
                            <h2>Network Engineer</h2>
                            </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                        <a class="nav-link" href="#programmer">
                            <i class="fa fa-laptop"></i>
                            <h2>PROGRAMMER</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="900ms">
                       <a class="nav-link" href="#it">
                            <i class="fa fa-shield"></i>
                            <h2>IT SECURITY</h2>
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="hi-icon-wrap hi-icon-effect wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="1200ms">
                        <a class="nav-link" href="#ithelp">
                            <i class="fa fa-phone"></i>
                            <h2>IT HELPDESK</h2>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section id="network">
    <div class="our-team" >
        <div class="container">
            <div class="text-center">
                <br />
                <h1>Network Engineer</h1>

            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p><u><b>
                        <asp:Label ID="Label5" Text="<%$Resources:Resource,job3 %>" runat="server" /></b></u></p>
                    <p class="indent">
                        <asp:Label ID="Label6" Text="<%$Resources:Resource,j1 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label7" Text="<%$Resources:Resource,j2 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label8" Text="<%$Resources:Resource,j3 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label9" Text="<%$Resources:Resource,j4 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label10" Text="<%$Resources:Resource,j5 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label11" Text="<%$Resources:Resource,j6 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label12" Text="<%$Resources:Resource,j7 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label13" Text="<%$Resources:Resource,j8 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label14" Text="<%$Resources:Resource,j9 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label15" Text="<%$Resources:Resource,j10 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label16" Text="<%$Resources:Resource,j11 %>" runat="server" /></p>

                </div>
            </div>
        </div>
    </div>
        </section>
    <section id="programmer">
    <div class="lates">
        <div class="container">
            <div class="text-center">
                <br />
                <h1>Programmer</h1>
            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p><u><b>
                        <asp:Label ID="Label17" Text="<%$Resources:Resource,job3 %>" runat="server" /></b></u> :</p>
                    <p class="indent">
                        <asp:Label ID="Label18" Text="<%$Resources:Resource,j12 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label19" Text="<%$Resources:Resource,j13 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label20" Text="<%$Resources:Resource,j14 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label21" Text="<%$Resources:Resource,j15 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label22" Text="<%$Resources:Resource,j16 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label23" Text="<%$Resources:Resource,j17 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label24" Text="<%$Resources:Resource,j18 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label25" Text="<%$Resources:Resource,j19 %>" runat="server" /></p>

                </div>
            </div>
        </div>
    </div>
        </section>
    <section id="it">
    <div class="our-team">
        <div class="container">
            <div class="text-center">
                <br />
                <h1>IT SECURITY</h1>
            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p><u><b>
                        <asp:Label ID="Label36" Text="<%$Resources:Resource,job3 %>" runat="server" /></b></u> :</p>
                    <p class="indent">
                        <asp:Label ID="Label26" Text="<%$Resources:Resource,j12 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label27" Text="<%$Resources:Resource,j20 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label28" Text="<%$Resources:Resource,j21 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label29" Text="<%$Resources:Resource,j22 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label30" Text="<%$Resources:Resource,j23 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label31" Text="<%$Resources:Resource,j24 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label32" Text="<%$Resources:Resource,j25 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label33" Text="<%$Resources:Resource,j26 %>" runat="server" /></p>

                </div>
            </div>
        </div>
    </div>
    </section>
    <section id="ithelp">
    <div class="lates">
        <div class="container">
            <div class="text-center">
                <br />
                <h1>IT Help Desk</h1>
            </div>
            <br />
            <div class="text-left">
                <div class="col-md-12 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <p><u><b>
                        <asp:Label ID="Label35" Text="<%$Resources:Resource,job3 %>" runat="server" /></b></u> :</p>
                    <p class="indent">
                        <asp:Label ID="Label34" Text="<%$Resources:Resource,j12 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label37" Text="<%$Resources:Resource,j27 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label38" Text="<%$Resources:Resource,j28 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label39" Text="<%$Resources:Resource,j29 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label40" Text="<%$Resources:Resource,j30 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label41" Text="<%$Resources:Resource,j31 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label42" Text="<%$Resources:Resource,j32 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label43" Text="<%$Resources:Resource,j33 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label44" Text="<%$Resources:Resource,j34 %>" runat="server" /></p>
                </div>
            </div>
        </div>
    </div>
    </section>

    <div class="our-team">

        <div class="container">
            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="text-center">
                    <h1>
                        <asp:Label ID="Label45" Text="<%$Resources:Resource,ben %>" runat="server" /></h1>
                </div>
                <div class="text-left">
                    <p class="indent">
                        <asp:Label ID="Label46" Text="<%$Resources:Resource,ben1 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label47" Text="<%$Resources:Resource,ben2 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label48" Text="<%$Resources:Resource,ben3 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label49" Text="<%$Resources:Resource,ben4 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label50" Text="<%$Resources:Resource,ben5 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label51" Text="<%$Resources:Resource,ben6 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label52" Text="<%$Resources:Resource,ben7 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label53" Text="<%$Resources:Resource,ben8 %>" runat="server" /></p>

                </div>
            </div>

            <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="text-center">
                    <h1>
                        <asp:Label ID="Label54" Text="<%$Resources:Resource,ev %>" runat="server" /></h1>
                </div>
                <div class="text-left">
                            <p class="indent">
                        <asp:Label ID="Label55" Text="<%$Resources:Resource,ev1 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label56" Text="<%$Resources:Resource,ev2 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label57" Text="<%$Resources:Resource,ev3 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label62" Text="<%$Resources:Resource,ev4 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label63" Text="<%$Resources:Resource,ev5 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label64" Text="<%$Resources:Resource,ev6 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label65" Text="<%$Resources:Resource,ev7 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label66" Text="<%$Resources:Resource,ev8 %>" runat="server" /></p>

                </div>
            </div>
              <div class="col-md-4 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">
                <div class="text-center">
                    <h1>
                        <asp:Label ID="Label58" Text="<%$Resources:Resource,hta %>" runat="server" /></h1>
                </div>
                <div class="text-left">
                    <p class="indent">
                        <asp:Label ID="Label59" Text="<%$Resources:Resource,hta1 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label60" Text="<%$Resources:Resource,hta2 %>" runat="server" /></p>
                    <p class="indent">
                        <asp:Label ID="Label61" Text="<%$Resources:Resource,ht3 %>" runat="server" /></p>

                </div>
            </div>
        </div>

    </div>
    <%-- modal--%>

    <asp:ScriptManager runat="server"></asp:ScriptManager>

    <div class="modal fade" id="myModal" role="dialog" runat="server">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <p>This is a large modal.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    <%-- end modal--%>
    
    <!-- jQuery and Bootstrap -->
    <script src="Scripts/jquery-3.2.1.min.js"></script>
    <script src="Scripts/bootstrap.bundle.min.js"></script>
    <!-- Plugins JS -->
    <script src="Scripts/owl.carousel.min.js"></script>
    <!-- Custom JS -->
    <script src="Scripts/script.js"></script>


</asp:Content>
