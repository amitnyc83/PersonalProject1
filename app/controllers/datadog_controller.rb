# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)

# Increment a counter.
statsd.increment('page.views')

# Record a gauge 50% of the time.
statsd.gauge('users.online', 123, :sample_rate=>0.5)

while true do
    statsd.increment('example_metric.increment', tags: ['environment:dev'])
    statsd.decrement('example_metric.decrement', tags: ['environment:dev'])
    statsd.count('example_metric.count', 2, tags: ['environment:dev'])
    sleep 10
end


i = 0

while true do
    i += 1
    statsd.gauge('example_metric.gauge', i, tags: ['environment:dev'])
    sleep 10
end


while true do
    i += 1
    statsd.set('example_metric.gauge', i, tags: ['environment:dev'])
    sleep rand 10
end

while true do
    statsd.set('example_metric.histogram', rand 20, tags: ['environment:dev'])
    sleep 2
end

while true do
    statsd.distribution('example_metric.gauge', rand 20, tags: ['environment:dev'])
    sleep 2
end
