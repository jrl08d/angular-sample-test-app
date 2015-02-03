require 'capybara/rspec'

Capybara.configure do |config|
	Capybara.default_driver = :webkit
end