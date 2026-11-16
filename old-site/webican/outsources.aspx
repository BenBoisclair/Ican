<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMenu.Master" AutoEventWireup="true" CodeBehind="outsources.aspx.cs" Inherits="webican.outsources" %>

<asp:Content ID="Content1" ContentPlaceHolderID="body" runat="server">

    <div id="breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <li><a href="home.aspx"><asp:Label ID="Label3" Text="<%$Resources:Resource,home %>" runat="server" /></a></li>
                <li><a href="service_product.aspx"><asp:Label ID="Label1" Text="<%$Resources:Resource,serviceandproduct %>" runat="server" /></a></li>
                <li>Out Sources</li>
            </div>
        </div>
    </div>

    <section id="partner">
        <div class="container">
            <div class="center wow fadeInDown">
                <h2><asp:Label ID="Label2" Text="<%$Resources:Resource,os1 %>" runat="server" /></h2>
            </div>

        </div>
        <!--/.container-->
    </section>

    <div class="services">
		<div class="container">
			<h3>Out Sources</h3>
			<hr/>
			<div class="col-md-6">
				<img src="Content/images/outsource.png" class="img-responsive"/>
			</div>
			
			<div class="col-md-6">
				<div class="media">
					<ul>
						<li>
							<div class="media-left">
								<i class="fa fa-laptop"></i>						
							</div>
							<div class="media-body">
								<h4 class="media-heading"> Software</h4>
								<p class="indent"><asp:Label ID="Label4" Text="<%$Resources:Resource,os2 %>" runat="server" /></p>
							</div>
						</li>
						<li>
							<div class="media-left">
								<i class="fa fa-wrench"></i>						
							</div>
							<div class="media-body">
								<h4 class="media-heading"> Hardware</h4>
								<p class="indent"><asp:Label ID="Label5" Text="<%$Resources:Resource,os3 %>" runat="server" /></p>
                                
							</div>
                            </li>
                        <li>
                            	<div class="media-body">
								<h4 class="media-heading"><asp:Label ID="Label7" Text="<%$Resources:Resource,os4 %>" runat="server" /></h4>
								<p><asp:Label ID="Label6" Text="<%$Resources:Resource,os5 %>" runat="server" /></p>
                                <p class="indent">1.IT Support (onsite/remote/24Hours)</p>
                                <p class="indent">2.IT Service Desk (onsite/remote/24Hours)</p>
                                <p class="indent">3.Consulting ( SAP –BI/ABAP)</p>
                                <p class="indent">4.Programmer (.Net , PHP , JAVA , SQL , Data Conversion, etc.)</p>
                                <p class="indent">5.System Engineer</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>


</asp:Content>
