class CreateTreatments < ActiveRecord::Migration[7.0]
  def change
    create_table :treatments do |t|
      t.string :name
      t.float :success_rate
      t.belongs_to :bug, null: false, foreign_key: true

      t.timestamps
    end
  end
end
