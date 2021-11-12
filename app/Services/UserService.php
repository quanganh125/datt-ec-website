<?php
namespace App\Services;

use App\Models\User;

class UserService
{
    /**
     * Get's a User by it's ID
     *
     * @param int
     * @return collection
     */
    public function get($id)
    {
        return User::find($id);
    }

    /**
     * Get's all Users.
     *
     * @return mixed
     */
    public function getAll()
    {
        return User::all();
    }

    public function find($id)
    {
        return User::find($id);
    }

    public function update($id, array $user_data){
        $user = tap(User::where('id', $id))->update($user_data);
        return response()->json($user);
    }

    /**
     * Deletes a User.
     *
     * @param int
     */
    public function delete($id)
    {
        $user = User::destroy($id);
        return response()->json($id);
    }
}