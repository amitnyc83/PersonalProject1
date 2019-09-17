require 'test_helper'

class SneakerControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get sneaker_create_url
    assert_response :success
  end

end
