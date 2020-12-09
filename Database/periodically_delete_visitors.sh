#!/bin/bash

#---------------------------
# Created by Dustin Ramseger
# 09.12.2020
#---------------------------

# Settings
user = "admin"
password = "admin123456"
database = "visitor_tracker"

# Define a timestamp function
timestamp() {
  date +"%T" # current time
}

# Delete all visitors who had bookings more than 4 weeks ago 
query = "DELETE FROM visitors WHERE id IN ( SELECT visitorid from bookings JOIN timeslots ON timeslots.id = bookings.timeslotid WHERE timeslots.start <= DATE_SUB(CURDATE(), INTERVAL 4 WEEK));" 

echo "$(timestamp): Start deleting visitors" >> ./result.txt
result = $(echo $query | mysql -u $user -p$password $database )
echo "$(timestamp): $result" >> ./result.txt

#mysql --user=admin --password=admin123456 --database=visitor_tracker --table --execute="DELETE FROM visitors WHERE id IN ( SELECT visitorid from bookings JOIN timeslots ON timeslots.id = bookings.timeslotid WHERE timeslots.start <= DATE_SUB(CURDATE(), INTERVAL 4 WEEK));" >>./result.txt
