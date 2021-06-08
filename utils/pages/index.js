import PieChart from 'Components/ChartComponents/PieChart'
import OverViewChart from 'Components/ChartComponents/OverViewChart'
import LeadChart from 'Components/ChartComponents/LeadChart'
import MemberChart from 'Components/ChartComponents/MemberChart'
import ClassSchedule from 'Components/ChartComponents/ClassSchedule'
import DonutChart from 'Components/ChartComponents/DonutChart'


export default function Home() {
  return (
    <div >
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row">
          </div>
              <div className="content-body">
                
                 
                <section id="apexchart">
                    <div className="row">

                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Pie Chart</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="pie-chart" className="mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Over View</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="line-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Lead</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="line-area-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Member</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="column-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Class Schedule</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="bar-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Pie Chart</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="pie-chart" className="mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         
                        <div className="col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Donut Chart</h4>
                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <div id="donut-chart" className="mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </section>
                 
                 

            </div>
          {/* <div className="content-body">
             <section id="apexchart">
              <div className="row">

                <div className="col-lg-6 col-md-12">
                  <PieChart />
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Pie Chart</h4>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <div id="pie-chart" className="mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <OverViewChart />
                </div>

                <div className="col-lg-6 col-md-12">
                  <LeadChart />
                </div>

                <div className="col-lg-6 col-md-12">
                  <MemberChart />

                </div>

                <div className="col-lg-6 col-md-12">
                  <ClassSchedule />

                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <PieChart />
                </div>

                <div className="col-lg-6 col-md-12">
                  <DonutChart />
                </div>
              </div>
            </section>
          </div> */}
        </div>
      </div>
    </div>
  )
}
