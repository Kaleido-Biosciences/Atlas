select e.name, e.study_environment, e.start_date, e.scientist_id, s.first_name, s.last_name
from experiment e
left join scientist s on e.scientist_id = s.id;