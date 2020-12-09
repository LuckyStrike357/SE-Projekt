#!/bin/bash

mysql --user=admin --password=admin123456 --database=visitor_tracker --table --execute="SELECT id FROM visitors WHERE id IN ( SELECT visitorid from bookings JOIN timeslots ON timeslots.id = bookings.timeslotid WHERE timeslots.start <= DATE_SUB(CURDATE(), INTERVAL 3 WEEK));" >> ./test.txt
