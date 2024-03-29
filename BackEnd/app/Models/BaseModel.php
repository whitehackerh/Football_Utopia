<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use App\Exceptions\ExpandException;
use Exception;

class BaseModel {
    /**
     * select *
     */
    public function get($table) {
        try {
            return DB::table($table)->get();
        } catch (Exception $e) {
            throw new ExpandException($e->getMessage(), config('ErrorConst.sqlError.code'));
        }
    }

    /**
     * select count(*)
     */
    public function getCount() {
        
    }
}