// 1. Listar todas as tarefas com status "Complete":

db.project.aggregate([
    {
        $unwind: "$tasks"
    },
    {
        $match: {
            "tasks.status": "Complete"
        }
    },
    {
        $project: {
            _id: 0,
            projectName: "$name",
            taskTitle: "$tasks.title",
            taskDescription: "$tasks.description"
        }
    }
]);

// 2. Listar todas as tarefas com prioridade "High":

db.project.aggregate([
  {
    $unwind: "$tasks"
  },
  {
    $match: {
      "tasks.priority": "High"
    }
  },
  {
    $project: {
      _id: 0,
      projectName: "$name",
      taskTitle: "$tasks.title",
      taskDescription: "$tasks.description"
    }
  }
]);

// 3. Listar todas as tarefas com status "In Progress":

db.project.aggregate([
  {
    $unwind: "$tasks"
  },
  {
    $match: {
      "tasks.status": "In-progress"
    }
  },
  {
    $project: {
      _id: 0,
      projectName: "$name",
      taskTitle: "$tasks.title",
      taskDescription: "$tasks.description"
    }
  }
]);

// 4. Listar todas as tarefas com prioridade média:

db.project.aggregate([
    {
        $unwind: "$tasks"
    },
    {
        $match: {
            "tasks.priority": "Medium"
        }
    },
    {
        $project: {
            _id: 0,
            projectName: "$name",
            taskTitle: "$tasks.title",
            taskDescription: "$tasks.description"
        }
    }
]);



// 5. Listar todas as tarefas atribuídas a um usuário específico.

db.project.aggregate([
    {
        $unwind: "$tasks"
    },
    {
        $match: {
            "tasks.user.first_name": "John"
        }
    },
    {
        $project: {
            _id: 0,
            projectName: "$name",
            taskTitle: "$tasks.title",
            taskDescription: "$tasks.description"
        }
    }
]);