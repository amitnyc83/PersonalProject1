require 'rubygems'
require 'dogapi'

api_key = "816226ca9d3053634e34827fff3c8915"
application_key = "<YOUR_DD_APP_KEY>"

# Submitting events does not require the application key.
dog = Dogapi::Client.new(api_key)

# Send a new event.
dog.emit_event(Dogapi::Event.new('this is a test message', :msg_title => 'Test Message'))
