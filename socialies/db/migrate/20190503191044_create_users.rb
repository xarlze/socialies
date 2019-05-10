class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :picture_url
      t.string :gender
      t.string :location
      t.text :description

      t.timestamps
    end
  end
end
