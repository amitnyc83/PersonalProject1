require 'adyen-ruby-api-library'
require 'json'



class CheckoutsController < ApplicationController

  def index
  end





  def get_payment_methods
    adyen = Adyen::Client.new
    adyen.env = :test
    adyen.api_key = ENV["API_KEY"]


    @response = adyen.checkout.payment_methods({
      :merchantAccount => ENV["MerchantAccount"],
      :countryCode => 'US',
      :amount => {
        :currency => 'EUR',
        :value => 1000
      },
    })
    render json: {response: @response}
  end

  def create

    @payment_response = Checkout.make_payment(params["paymentMethod"])

    @payment_response_hash = JSON.parse(payment_response.body)

    @result_code = @payment_response_hash["resultCode"]
    @action = @payment_response_hash["action"]
    @paymentMethodType = params["paymentMethod"]["type"]

    case @result_code
    when "Authorised"
      render json: {message: "Your payment has been authorized", result_code: @result_code}
    when "RedirectShopper"
      if @paymentMethodType == "ideal"
        render json: {message: "You are being redirected", redirect: @payment_response_hash["redirect"]["url"] }
      end

      if @paymentMethodType == "scheme"

        session[:payment_data] = @payment_response_hash["paymentData"]
        render json: @action
      end
    when "Error"
      render json: {message:" There was an Error proceesing your payment", error: @result_code}
      redirect_to '/checkout/error'
    else
      # Handle other payment result codes
    end
  end

  def confirmation
  end

  def error
  end


  def details
    payload = {}
    details = {}
    details["MD"] = params["MD"]
    details["PaRes"] = params["PaRes"]
    payload["details"] = details
    payload["paymentData"] = session[:payment_data]

    resp = Checkout.submit_details(payload)
    resp_hash = JSON.parse(resp.body)

    session[:payment_data] = ""

    if resp_hash["resultCode"] == "Authorised"
      redirect_to '/checkout/confirmation'
    else
      redirect_to '/checkout/error'
    end
  end







end
