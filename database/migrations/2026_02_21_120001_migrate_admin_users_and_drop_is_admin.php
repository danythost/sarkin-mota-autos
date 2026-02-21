<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Copy users with is_admin = true into admins, then remove is_admin from users.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'is_admin')) {
            return;
        }

        $adminUsers = DB::table('users')->where('is_admin', true)->get();

        foreach ($adminUsers as $user) {
            DB::table('admins')->insert([
                'name' => $user->name,
                'email' => $user->email,
                'password' => $user->password,
                'remember_token' => $user->remember_token,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => now(),
            ]);
        }

        DB::table('users')->where('is_admin', true)->delete();

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false)->after('password');
        });

        $admins = DB::table('admins')->get();
        foreach ($admins as $admin) {
            DB::table('users')->insert([
                'name' => $admin->name,
                'email' => $admin->email,
                'password' => $admin->password,
                'remember_token' => $admin->remember_token,
                'email_verified_at' => $admin->email_verified_at,
                'is_admin' => true,
                'created_at' => $admin->created_at,
                'updated_at' => $admin->updated_at,
            ]);
        }
    }
};
