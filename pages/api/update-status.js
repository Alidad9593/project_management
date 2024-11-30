// export default async function handler(req, res) {
//     if(req.method === "POST"){
//         const {taskId, newStatus} = req.body;
//         console.log('taskId:', taskId);
//         console.log('newStatus:', newStatus);
//         try{
//             const result = await query(`
//             UPDATE kanban_board
//             SET status = $1
//             WHERE kanban_id = $2
//             RETURNING *;
//             `, [newStatus, taskId]);
//             res.status(200).json({ message: 'Status updated successfully', kanban: result.rows[0] });
//         } catch (error) {
//             console.error('Error updating status:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }

// }
import { query } from '../../lib/db';
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { taskId, newStatus } = req.body;

        // Check if taskId and newStatus are provided
        if (!taskId || !newStatus) {
            return res.status(400).json({ error: 'Missing taskId or newStatus' });
        }

        try {
            // Log inputs for debugging
            console.log('Updating task:', taskId, 'to status:', newStatus);

            // Execute the database query
            const result = await query(`
                UPDATE kanban_board
                SET status = $1
                WHERE kanban_id = $2
                RETURNING *;
            `, [newStatus, taskId]);

            // Check if the task was updated
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.status(200).json({ message: 'Status updated successfully', kanban: result.rows[0] });
        } catch (error) {
            // Log the error for debugging
            console.error('Error updating task status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
