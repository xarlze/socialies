class User < ApplicationRecord
    has_secure_password
    validates :email, presence:true
    
    has_and_belongs_to_many :friendships,
        class_name: "User", 
        join_table:  :friendships, 
        foreign_key: :user_id, 
        association_foreign_key: :friend_user_id

    def to_token_payload
        {
        sub: id,
        email: email
        }
    end
end
