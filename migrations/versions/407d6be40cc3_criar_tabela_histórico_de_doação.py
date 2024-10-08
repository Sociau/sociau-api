"""Criar tabela histórico de doação

Revision ID: 407d6be40cc3
Revises: a08da7e68e9e
Create Date: 2024-09-15 15:41:07.423793

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '407d6be40cc3'
down_revision = 'a08da7e68e9e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('donation_history',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('person_id', sa.Integer(), nullable=True),
                    sa.Column('amount', sa.Float(), nullable=False),
                    sa.ForeignKeyConstraint(['person_id'], ['person.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('donation_history')
    # ### end Alembic commands ###
