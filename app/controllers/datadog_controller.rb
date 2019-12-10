require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.increment('example_metric.increment', tags: ['environment:dev'])
    statsd.decrement('example_metric.decrement', tags: ['environment:dev'])
    statsd.count('example_metric.count', 2, tags: ['environment:dev'])
    sleep 10
end
