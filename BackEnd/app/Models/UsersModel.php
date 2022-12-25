<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Exceptions\ExpandException;
use Exception;

class UsersModel extends BaseModel {
    private $table = 'users';
    public function updateUsersBasicProfile($request) {
        try {
            DB::table($this->table)
                    ->where('id', $request->input('user_id'))
                    ->update([
                        'user_name' => $request->input('user_name'),
                        'name' => $request->input('name'),
                        'email' => $request->input('email'),
                        'age' => $request->input('age'),
                        'gender' => $request->input('gender')
                    ]);
            return;
        } catch (Exception $e) {
            throw new ExpandException($e->getMessage(), config('ErrorConst.sqlError.code'));
        }
    }
}