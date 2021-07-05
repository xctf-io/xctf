import { SingleTeamFragment } from "../generated";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { KIND, Tag, VARIANT } from "baseui/tag";
import { Icon } from "baseui/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label1 } from "baseui/typography";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";

type TeamMemberProps = {
  user: SingleTeamFragment["members"][0];
};

export function TeamMember({ user }: TeamMemberProps) {
  const [css] = useStyletron();
  return (
    <Block
      paddingRight={"scale600"}
      className={css({
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
      })}
    >
      <Block position={"relative"}>
        <Avatar
          size="scale2400"
          name={user?.name || ""}
          src={user?.avatar || undefined}
        />
        {user?.score ? (
          <Tag
            closeable={false}
            kind={KIND.positive}
            variant={VARIANT.solid}
            overrides={{
              Root: {
                style: {
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: 1,
                  marginRight: -10,
                },
              },
            }}
          >
            <Icon>
              <FontAwesomeIcon icon={faTrophy} />
            </Icon>{" "}
            {user?.score}
          </Tag>
        ) : null}
      </Block>

      <Label1>{user?.name} </Label1>
      {/* todo flag icon */}
      {user?.country ? user?.country : null}

      {user?.captain_of?.id ? (
        <Tag closeable={false} kind={KIND.neutral}>
          Captain
        </Tag>
      ) : null}
    </Block>
  );
}
