require 'test_helper'

class NavigationTest < ActionDispatch::IntegrationTest
  test "Renders the collection json broswer documentation page" do
    get collection_json_browser_path
    assert_match(/Path/, response.body)
  end
end

