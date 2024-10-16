"""adicionar campo foto ao pet

Revision ID: 750d1ac1e9a3
Revises: 83a95b30e6ea
Create Date: 2024-10-16 15:07:49.229463

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '750d1ac1e9a3'
down_revision = '83a95b30e6ea'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('main_photo', sa.String(length=500), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet', schema=None) as batch_op:
        batch_op.drop_column('main_photo')
    # ### end Alembic commands ###