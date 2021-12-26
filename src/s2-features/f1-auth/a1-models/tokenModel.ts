import sequelizeInstance from "../../../s1-main/dbInit"
import { Model, DataTypes} from "sequelize"
/* 
interface TokenAttributes {
    refreshToken: string
}

export interface TokenInstance
  extends Model<TokenAttributes>,
    TokenAttributes {}
 */
const config = {
    tableName: 'tokens',
    sequelize: sequelizeInstance,
};

export class Token extends Model {
    public refreshToken!: string;
    public userId!: number;
}
Token.init(
    {
        refreshToken: { type: DataTypes.STRING, allowNull: false }
    },
    config,
)


/* 
export const Token = sequelize.define<TokenInstance>("token", {
    refreshToken: { type: DataTypes.STRING, allowNull: false }
}) */