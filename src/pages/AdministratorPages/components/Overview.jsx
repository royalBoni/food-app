import React from 'react'
import './overview.css'
import { FaAngleDown, FaDonate, FaMoneyBillWave, FaShoppingBag, FaUsers } from 'react-icons/fa'
import { selectAllTransactions } from '../../../features/transactionSlice.js/adminTransactionSlice'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { selectAllCustomers } from '../../../features/customers/customersSlice'
import { useSelector } from 'react-redux'
import format from 'date-fns/format'
import { useState } from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'
import { ResponsiveBar } from '@nivo/bar'
import { /* geoData */chartData,worldCountries } from '../../../assets/info/infoData'
import { countryCode } from '../../../assets/info/countryAndCode'

const Overview = ({setActiveNavItem}) => {

    const [activeFilter,setActiveFilter]= useState(4)
    const [activeTopProduct, setActiveTopProduct] = useState()
    const transactions = useSelector(selectAllTransactions)
    const customers = useSelector(selectAllCustomers)
    const allDishes= useSelector(selectAllDishes)

    const activeHovered = (id) =>{
        setActiveTopProduct(id)
    }

    //FUNCTION TO FETCH THE DISH NAME WHEN THE ID IS PASSED
    const fetchDishName = (id) =>{
        const dish=allDishes.find((dish)=>dish._id===id)
        return dish?.dishName
    }

    //COMPUTING FOR THE TOPMOST TRANSACTION
    
    const topMostTransaction =()=>{
        const findTopTransactions = transactions.sort((a, b) => {
            return b.amountPayable - a.amountPayable;
        });

        return findTopTransactions.slice(0,4)
    }


    //COMPUTING FOR THE TOTAL REVENUE
    let totalRevenue = 0

    transactions?.map((item)=>{
      totalRevenue+=item.amountPayable
      return totalRevenue
    })


    //COMPUTING THE TOPMOST PRODUCTS BASED ON SALES
    
    const topProducts = ()=>{
        const topPurchasesArray = []
        const singlePurchase=[]

        allDishes.map((dish)=>{
            const productObject = {dishId:dish._id, noOfSales:0}
            topPurchasesArray.push(productObject)
            return true
        })

        transactions.map((item)=>{
            (item.cartItems).map((unitItem)=>{
                singlePurchase.push(unitItem)
                return true
            })
            return true
        })

        topPurchasesArray.map((item)=>{
            singlePurchase.map((single)=>{
                if(item.dishId === single.dishId){
                    item.noOfSales = item.noOfSales+single.quantity
                }
                return true
            })
            return true
        })

        const sortedTopPurchases = topPurchasesArray.sort((a,b)=>{
            return b.noOfSales - a.noOfSales
        })

        return sortedTopPurchases
    }


    //COMPUTING FOR NUMBER OF CUSTOMERS FROM EACH COUNTRY

    const geoData = () =>{
        const countryCustomers = []

        countryCode.map((coutry)=>{
            const countryInstance = {id:coutry.code, value:0}
            countryCustomers.push(countryInstance)

            return true
        })


        countryCustomers.map((item)=>{
            customers.map((customer)=>{
                if(item.id === customer.country){
                    item.value = item.value+1
                }
                return true
            })
            return true
        })

        const sortedcountryCustomers = countryCustomers.sort((a,b)=>{
            return b.value - a.value
        })
        return sortedcountryCustomers
    }


    // FUNCTION TO SET ACTIVE FILTER ITEM

    const setActiveFilterItem = (id) =>{
        setActiveFilter(id)
    }

  return (
    <div className='overview'>
        <div className="overview-item">
            <div className="filter-section">
                <div className={activeFilter===1?"active-filter-item":null} onClick={()=>setActiveFilterItem(1)}>Last 24 hours</div>
                <div className={activeFilter===2?"active-filter-item":null} onClick={()=>setActiveFilterItem(2)}>Last week</div>
                <div className={activeFilter===3?"active-filter-item":null} onClick={()=>setActiveFilterItem(3)}>Last month</div>
                <div className={activeFilter===4?"active-filter-item":null} onClick={()=>setActiveFilterItem(4)}>Last year</div>
            </div>
            <div className="filter-section">
                <div className={activeFilter===5?"active-filter-item":null} onClick={()=>setActiveFilterItem(5)}>Filter by date range <FaAngleDown/></div>
            </div>
        </div>
        
        <div className="overview-item">
            <div className="overview-item-container">
                <div className="metric-title"><div className="metric-title-icon"><FaMoneyBillWave/></div>Total Revenue</div>
                <div className="metric-content">
                    <div className="metric-content-quantity">{`GHS${(totalRevenue).toFixed(2)}`}</div>
                    <div className="metric-content-chart">
                        <div className="metric-content-chart-value"  style={{color:"green"}}>
                            + 0.5%
                        </div>
                        <div className='description'>
                            vs last 7 days
                        </div>
                    </div>
                </div>
            </div>
            <div className="overview-item-container">
                <div className="metric-title"><div className="metric-title-icon"><FaUsers/></div>Total Customers</div>
                <div className="metric-content">
                    <div className="metric-content-quantity">{customers.length}</div>
                    <div className="metric-content-chart">
                        <div className="metric-content-chart-value"  style={{color:"red"}}>
                            - 0.5%
                        </div>
                        <div className='description'>
                            vs last 7 days
                        </div>
                    </div>
                </div>
            </div>
            <div className="overview-item-container">
                <div className="metric-title"><div className="metric-title-icon"><FaDonate/></div>Total Transactions</div>
                <div className="metric-content">
                    <div className="metric-content-quantity">{transactions.length}</div>
                    <div className="metric-content-chart">
                        <div className="metric-content-chart-value" style={{color:"green"}}>
                            + 0.5%
                        </div>
                        <div className='description'>
                            vs last 7 days
                        </div>
                    </div>
                </div>
            </div>
            <div className="overview-item-container">
                <div className="metric-title"><div className="metric-title-icon"><FaShoppingBag/></div>Total Products</div>
                <div className="metric-content">
                    <div className="metric-content-quantity">{allDishes.length}</div>
                    <div className="metric-content-chart">
                        <div className="metric-content-chart-value" style={{color:"green"}}>
                            + 0.5%
                        </div>
                        <div className='description'>
                            vs last 7 days
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="overview-item">
            <section>
                <div className="section-header">
                    <div className="section-header-title">
                        <div className="section-header-title-name">Reveue Growth</div>
                        <div className="section-header-title-description">based on total services</div>
                    </div>
                    <div className="section-header-view-btn">View details</div>
                </div>

                <div className="section-content">
                    <div className="barchart-content">
                        <ResponsiveBar
                        data={chartData}
                        keys={[
                            'hot dog',
                            'burger',
                            'sandwich',
                            'kebab',
                            'fries',
                            'donut'
                        ]}
                        indexBy="country"
                        margin={{ top: 0, right: 130, bottom: 0, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'fries'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'sandwich'
                                },
                                id: 'lines'
                            }
                        ]}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'country',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'food',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                        />
                    </div>
                </div>
            </section>

            <section>
                <div className="section-header">
                    <div className="section-header-title">
                        <div className="section-header-title-name">Customer Growth</div>
                        <div className="section-header-title-description">based on countries of services</div>
                    </div>
                    <div className="section-header-view-btn" onClick={()=>setActiveNavItem(3)}>View details</div>
                </div>

                <div className="section-content">
                    <div className="geochart-content">
                        <div className="top-country-geo">
                            <ResponsiveChoropleth
                            data={geoData()}
                            features={worldCountries.features}
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            colors="nivo"
                            domain={[ 0, 1000000 ]}
                            unknownColor="#666666"
                            label="properties.name"
                            valueFormat=".2s"
                            projectionTranslation={[ 0.5, 0.5 ]}
                            projectionRotation={[ 0, 0, 0 ]}
                            enableGraticule={true}
                            graticuleLineColor="#dddddd"
                            borderWidth={0.5}
                            borderColor="#152538"
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: '#38bcb2',
                                    size: 4,
                                    padding: 10,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: '#eed312',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                },
                                {
                                    id: 'gradient',
                                    type: 'linearGradient',
                                    colors: [
                                        {
                                            offset: 0,
                                            color: '#000'
                                        },
                                        {
                                            offset: 100,
                                            color: 'inherit'
                                        }
                                    ]
                                }
                            ]}
                            fill={[
                                {
                                    match: {
                                        id: 'CAN'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'CHN'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'ATA'
                                    },
                                    id: 'gradient'
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom-left',
                                    direction: 'column',
                                    justify: true,
                                    translateX: 0,
                                    translateY: 0,
                                    itemsSpacing: 0,
                                    itemWidth: 94,
                                    itemHeight: 18,
                                    itemDirection: 'left-to-right',
                                    itemTextColor: '#444444',
                                    itemOpacity: 0.85,
                                    symbolSize: 18,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000000',
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                            />
                        </div>

                        <div className="top-country">
                            {
                                (geoData().slice(0,4)).map((geo)=>{
                                    return(
                                        <div key={geo.id} className='individual-top-country'>
                                            <div className="country">{geo.id}</div>
                                            <div className="country-value">
                                                <div className="value-visiuals">
                                                    <div className="indicator" style={{width:`${Math.round(((geo.value/customers?.length)*100))}%`}}></div>
                                                </div>
                                                <div className="value-percentage">{`${Math.round(((geo.value/customers?.length)*100))}%`}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </section>

            <section>  
                <div className="section-header">
                    <div className="section-header-title">
                        <div className="section-header-title-name">Top Transactions</div>
                        <div className="section-header-title-description">based on total purchase</div>
                    </div>
                    <div className="section-header-view-btn" onClick={()=>setActiveNavItem(4)}>View details</div>
                </div>

                <div className="section-content">
                   
                    <table>
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>First Item</th>
                                <th>Date</th>
                                <th>Amt Payed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                topMostTransaction()?.map((item)=>{
                                    return(
                                        <tr key={item._id}>
                                            <td>{`${(item.customerId).slice(0,10)}...`}</td>
                                            <td>{fetchDishName((item.cartItems[0].dishId))}</td>
                                            <td>{format(new Date(item.date), 'e MMM')}</td>
                                            <td>{item.amountPayable}</td>
                                        </tr>
                                    )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <div className="section-header">
                    <div className="section-header-title">
                        <div className="section-header-title-name">Top Products</div>
                        <div className="section-header-title-description">top 3 based on total quantity sold</div>
                    </div>
                    <div className="section-header-view-btn" onClick={()=>setActiveNavItem(2)}>View more</div>
                </div>

                <div className="section-content">
                    <div className="top-products">
                        {
                            (topProducts().slice(0,3))?.map((item)=>(
                                allDishes?.map((dish)=>{
                                    if(item.dishId === dish._id){
                                        return(
                                            <div key={item.dishId} className='top-product-item' onMouseOver={()=>activeHovered(item.dishId)}>
                                                <img src={dish.dish_image_url} alt="" />
                                                <p className={activeTopProduct===item.dishId?'msg':"no-msg"}>{dish.dishName}</p>
                                                <p className={activeTopProduct===item.dishId?'msg-2':"no-msg-2"}>
                                                    <span>{item.noOfSales}</span>
                                                    items sold out
                                                </p>
                                                <div className={activeTopProduct===item.dishId?"top-product-item-message":null}>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return true
                                })
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Overview