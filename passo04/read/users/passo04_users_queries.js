// 1. Listar todos os usuários no banco de dados:

db.project.aggregate([
  {
    $unwind: "$tasks"
  },
  {
    $project: {
      _id: 0,
      firstName: "$tasks.user.first_name",
      lastName: "$tasks.user.last_name",
      email: "$tasks.user.email",
      cellPhone: "$tasks.user.cell_phone"
    }
  },
  {
    $group: {
      _id: null,
      users: {
        $addToSet: {
          firstName: "$firstName",
          lastName: "$lastName",
          email: "$email",
          cellPhone: "$cellPhone"
        }
      }
    }
  }
]);

// 2. Listagem de usuários que tem mais de 01 tarefa atribuída:

db.project.aggregate([
    {
        $unwind: "$tasks"
    },
    {
        $group: {
            _id: {
                firstName: "$tasks.user.first_name",
                lastName: "$tasks.user.last_name",
                email: "$tasks.user.email",
                cellPhone: "$tasks.user.cell_phone"
            },
            totalTasks: { $sum: 1 }
        }
    },
    {
        $match: {
            totalTasks: { $gt: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            firstName: "$_id.firstName",
            lastName: "$_id.lastName",
            email: "$_id.email",
            cellPhone: "$_id.cellPhone",
            totalTasks: 1
        }
    }
]);

// 3. Listagem de usuários que estão em 2 ou mais projetos:

db.project.aggregate([
    {
        $unwind: "$tasks"
    },
    {
        $group: {
            _id: {
                firstName: "$tasks.user.first_name",
                lastName: "$tasks.user.last_name",
                email: "$tasks.user.email",
                cellPhone: "$tasks.user.cell_phone"
            },
            totalProjects: { $addToSet: "$name" }
        }
    },
    {
        $match: {
            $expr: { $gte: [{ $size: "$totalProjects" }, 2] }
        }
    },
    {
        $project: {
            _id: 0,
            firstName: "$_id.firstName",
            lastName: "$_id.lastName",
            email: "$_id.email",
            cellPhone: "$_id.cellPhone",
            totalProjects: { $size: "$totalProjects" }
        }
    }
]);

// 4. Listagem de usuários que mais tem tarefas no status "Complete"

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
        $group: {
            _id: {
                firstName: "$tasks.user.first_name",
                lastName: "$tasks.user.last_name",
                email: "$tasks.user.email",
                cellPhone: "$tasks.user.cell_phone"
            },
            totalCompleteTasks: { $sum: 1 }
        }
    },
    {
        $sort: { totalCompleteTasks: -1 }
    },
    {
        $project: {
            _id: 0,
            firstName: "$_id.firstName",
            lastName: "$_id.lastName",
            email: "$_id.email",
            cellPhone: "$_id.cellPhone",
            totalCompleteTasks: 1
        }
    }
]);


// 5. Listagem de usuários que tem uma ou mais tarefas no status "Todo"

db.project.aggregate([
    {
        $unwind: "$tasks"
    },
    {
        $match: {
            "tasks.status": "Todo"
        }
    },
    {
        $group: {
            _id: {
                firstName: "$tasks.user.first_name",
                lastName: "$tasks.user.last_name",
                email: "$tasks.user.email",
                cellPhone: "$tasks.user.cell_phone"
            },
            totalTodoTasks: { $sum: 1 }
        }
    },
    {
        $match: {
            totalTodoTasks: { $gte: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            firstName: "$_id.firstName",
            lastName: "$_id.lastName",
            email: "$_id.email",
            cellPhone: "$_id.cellPhone",
            totalTodoTasks: 1
        }
    }
]);
