export const allProjects = [
    {
        "id": 1,
        "title": "Doggy Driving Lessons",
        "venue": "Salter Point Vet",
        "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
        "pledgetype": 1,
        "goal_amount": 1500,
        "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "is_open": true,
        "date_created": "2020-09-14T10:09:43.460155Z",
        "user": "evie",
        "due_date": "2020-10-07T14:28:23.382748Z",
        "category": 1,
        "location": "South Perth",
        "last_milestone": 25,
        "last_chance_triggered": false,
        "current_amount_pledged": 450,
        "current_percentage_pledged": 30.0,
        "check_for_milestone": null,
        "check_close_to_due_date": null
    }
];

export const oneProject = {
    "id": 1,
    "title": "Doggy Driving Lessons",
    "venue": "Salter Point Vet",
    "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
    "pledgetype": 1,
    "goal_amount": 1500,
    "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "is_open": true,
    "date_created": "2020-09-14T00:09:43.460155Z",
    "user": "michelle",
    "due_date": "2020-10-08T12:28:23.382748Z",
    "category": 1,
    "location": "South Perth",
    "last_milestone": 25,
    "last_chance_triggered": false,
    "current_amount_pledged": 950,
    "current_percentage_pledged": 57.4,
    "check_for_milestone": null,
    "check_close_to_due_date": null,
    "updates": [
        {
            "id": 1,
            "date_posted": "2020-08-26T10:23:34.701803Z",
            "content": "Hey everyone! Here's an update on our project.",
            "image": "https://images.unsplash.com/photo-1593297858385-1fa0a686f544?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
        }
    ],
    "project_activity": [
        {
            "id": 1,
            "action": "project-created",
            "datetime": "2020-09-14T10:09:43.484706Z",
            "user_id": "michelle",
            "location": "South Perth",
            "project_id": 1
        },
        {
            "id": 2,
            "action": "milestone-25",
            "datetime": "2020-09-14T22:57:10.370045Z",
            "user_id": "michelle",
            "location": "South Perth",
            "project_id": 1
        }
    ],
    "pledges": [
        {
            "id": 1,
            "amount": 450,
            "comment": "YES yes yes! i LOVE driving",
            "anonymous": false,
            "user": "evie",
            "project_id": 1,
            "date_created": "2020-09-14T22:56:38.444581Z",
            "type_id": 1
        },
        {
            "id": 5,
            "amount": 500,
            "comment": "Genius!",
            "anonymous": true,
            "user": "billy",
            "project_id": 1,
            "date_created": "2020-08-29T10:52:43.369387Z",
            "type_id": 1
        }
    ],
    "view_count": 6,
    "pledge_count": 2,
    "conversion_rate": 16.7,
    "average_pledge": 450.0
}

export const loggedInUser = {
    "id": 1,
    "is_admin": true,
    "username": "michelle",
    "email": "mich@email.com",
    "location_id": 1,
    "password": "test4321",
    "image": "https://images.unsplash.com/photo-1538127426967-75a6c73f6d20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    "bio": "First time I've signed up to a fake crowdfunding site! Pretty exciting. I'm mostly interested in pledging to the cute animal projects.",
    "favourite_categories": [
        1
    ],
    "pledges": [
        {
            "id": 1,
            "amount": 450,
            "comment": "YES yes yes! i LOVE driving",
            "anonymous": false,
            "user": "evie",
            "project_id": 1,
            "date_created": "2020-09-14T22:56:38.444581Z",
            "type_id": 1
        },
        {
            "id": 5,
            "amount": 500,
            "comment": "Genius!",
            "anonymous": true,
            "user": "evie",
            "project_id": 1,
            "date_created": "2020-08-29T10:52:43.369387Z",
            "type_id": 1
        }
    ],
    "badges": [
        {
            "title": "First Pledge",
            "icon": "fas fa-trophy",
            "date": "2020-08-29T10:52:43.369387Z"
        },
        {
            "title": "Pledged $100 to local projects",
            "icon": "fas fa-coins",
            "date": "2020-08-29T10:52:43.369387Z"
        }
    ]
}


export const activityFeed = {
    "id": 1,
    "name": "South Perth",
    "activity": [
        {
            "id": 4,
            "action": "last-chance",
            "info": "",
            "datetime": "2020-09-20T22:57:10.370045Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
            }
        },
        {
            "id": 3,
            "action": "progress-update",
            "info": "Hey guys, here's the update",
            "datetime": "2020-09-17T22:57:10.370045Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "image": "https://images.unsplash.com/photo-1593297858385-1fa0a686f544?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
            }
        },
        {
            "id": 1,
            "action": "project-created",
            "datetime": "2020-09-14T10:09:43.484706Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
                "pledges": [
                    {
                        "id": 1,
                        "amount": 450,
                        "comment": "YES yes yes! i LOVE driving",
                        "anonymous": false,
                        "user": 4,
                        "project_id": 1,
                        "date_created": "2020-09-14T22:56:38.444581Z",
                        "type_id": 1
                    }
                ]
            }
        },
        {
            "id": 2,
            "action": "milestone",
            "info": 25,
            "datetime": "2020-09-14T22:57:10.370045Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
            }
        },
        {
            "id": 1,
            "action": "project-created",
            "datetime": "2020-09-14T10:09:43.484706Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
                "pledges": [
                    {
                        "id": 1,
                        "amount": 450,
                        "comment": "YES yes yes! i LOVE driving",
                        "anonymous": false,
                        "user": 4,
                        "project_id": 1,
                        "date_created": "2020-09-14T22:56:38.444581Z",
                        "type_id": 1
                    }
                ]
            }
        },
        {
            "id": 2,
            "action": "milestone",
            "info": 25,
            "datetime": "2020-09-14T22:57:10.370045Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
            }
        },
        {
            "id": 1,
            "action": "project-created",
            "datetime": "2020-09-14T10:09:43.484706Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
                "pledges": [
                    {
                        "id": 1,
                        "amount": 450,
                        "comment": "YES yes yes! i LOVE driving",
                        "anonymous": false,
                        "user": 4,
                        "project_id": 1,
                        "date_created": "2020-09-14T22:56:38.444581Z",
                        "type_id": 1
                    }
                ]
            }
        },
        {
            "id": 2,
            "action": "milestone",
            "info": 25,
            "datetime": "2020-09-14T22:57:10.370045Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
            }
        },
        {
            "id": 1,
            "action": "project-created",
            "datetime": "2020-09-14T10:09:43.484706Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
                "pledges": [
                    {
                        "id": 1,
                        "amount": 450,
                        "comment": "YES yes yes! i LOVE driving",
                        "anonymous": false,
                        "user": 4,
                        "project_id": 1,
                        "date_created": "2020-09-14T22:56:38.444581Z",
                        "type_id": 1
                    }
                ]
            }
        },
        {
            "id": 3,
            "action": "progress-update",
            "info": "Hey guys, here's the update",
            "datetime": "2020-09-17T22:57:10.370045Z",
            "user_id": 3,
            "location_id": 1,
            "project_id": 1,
            "image": "https://images.unsplash.com/photo-1593297858385-1fa0a686f544?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
            "project": {
                "id": 1,
                "title": "Doggy Driving Lessons",
                "venue": "Salter Point Vet",
                "description": "Is your dog a menace on the road? We are raising money to provide free driving classes to all dogs living in the City of South Perth. Term One will cover accelerating, braking and reverse-parallel parking. Treats will be provided, cars will not - each dog must have permission to learn in their owner's car. Let's make our neighborhood streets the safest in the metro area!.",
                "pledgetype": 1,
                "goal_amount": 1500,
                "image": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "is_open": true,
                "date_created": "2020-09-14T10:09:43.460155Z",
                "user": 3,
                "due_date": "2020-10-07T14:28:23.382748Z",
                "category": 1,
                "location_id": 1,
                "last_milestone": 25,
                "last_chance_triggered": false,
                "current_amount_pledged": 450,
                "current_percentage_pledged": 30.0,
                "check_for_milestone": null,
                "check_close_to_due_date": null,
            }
        },
    ]
}