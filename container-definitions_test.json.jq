[
  {
    "name": "{{$PROJECT_NAME}}",
    "image": "nexus.hspconsortium.org:18083/hspc/ehr-app:0.0.1",
    "cpu": 0,
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 0,
        "protocol": "tcp"
      }
    ],
    "memoryReservation": 100,
    "essential": true
  }
]
