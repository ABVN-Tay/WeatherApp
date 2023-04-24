sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, MessageToast, JSONModel) {
        "use strict";
        var Vlocation,Vtemp
        return Controller.extend("rdc.controller.MainMart", {
            onInit: function () {
                
            },
            onShowHello: function () {
                // create XHR object
                var xhttp = new XMLHttpRequest();
                var text = this.getView().byId("Input_Location");
                var location = text.mProperties.value;
                xhttp.addEventListener("load", ()=>{
                    console.log(xhttp.response)
                    var dow = ['SunDay','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    var message = JSON.parse(xhttp.response)

                    message.forecast.forecastday.shift()

                    message.forecast.forecastday.forEach(e => {
                        var date = new Date(e.date);
                        var dw = date.getDay();
                        e.date = dow[dw];
                    });
                    var oModel = new JSONModel(message)
                    this.getView().setModel(oModel);
                    console.log(oModel)
                    if(message.hasOwnProperty('error'))
                    {
                        alert(message.error.message)
                    }
                    else {
                        // this.getView().byId("Panel1").setHeaderText(`Result for `+ location)


                        // this.getView().byId("H2").setVisible(true)
                        Text_precip
                        this.getView().byId("Text_precip").setVisible(true)
                        this.getView().byId("Text_wind").setVisible(true)
                        this.getView().byId("Text_humidity").setVisible(true)
                        
                        this.getView().byId("_IDGenLabel1").setVisible(true)
                        var Text_humidity = this.getView().byId("Text_humidity_result")
                        var Temp_location = this.getView().byId("Text_temp_result")
                        var Image_wstatus = this.getView().byId("Icon_wstatus")
                        var Text_wind = this.getView().byId("Text_wind_result")
                        var Text_precip = this.getView().byId("Text_precip_result")
                        this.getView().byId("SimpleFormDisplay480_12120Dual").setTitle(`Result for ` + location)
                        this.getView().byId("Text_status").setText(message.current.condition.text)
                        
                        var date = new Date(message.location.localtime)
                        var dw = date.getDay()
                        Text_humidity.setText(` : ` + message.current.humidity + `%`)
                        Image_wstatus.setSrc(message.current.condition.icon)
                        Temp_location.setText( `Current: ` + message.current.temp_c + `°C`)
                        Text_wind.setText(` : ` + message.current.wind_mph + ` mph`)
                        Text_precip.setText(` : ` + message.current.precip_mm + `%`)
                        // this.getView().byId("text_temp").setText( message.current.mintemp_c + "°C" + ` to ` + message.current.maxtemp_c + "°C")
                        
                        this.getView().byId("Text_day").setText(dow[dw]+ ` ` +date.getHours()+ `:` +date.getMinutes())
                        this.getView().byId("Text_condition_result").setText(message.current.condition.text)
                        // this.getView().byId("gridList").setItem(message.forecast.forecastday)
                    }
                },
                "error",()=>{
                    var message = JSON.parse(xhttp.response)
                    console.log(message)
                    alert(message.error.message)
                })
                xhttp.open("GET",`https://api.weatherapi.com/v1/forecast.json?q=` + location +`&days=7&key=bf4b5a959a854c819be21633232004`);
                xhttp.send();
            }
            });
    });
