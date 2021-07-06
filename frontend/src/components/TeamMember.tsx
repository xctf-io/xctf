import { TeamMemberFragment } from "../generated";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { KIND, Tag, VARIANT } from "baseui/tag";
import { Icon } from "baseui/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label1 } from "baseui/typography";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { faCrown } from "@fortawesome/free-solid-svg-icons/faCrown";

type TeamMemberProps = {
  user: TeamMemberFragment;
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
                  right: "-5px",
                  zIndex: 1,
                  marginRight: 0,
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
        {user?.captain_of?.id ? (
          <Tag
            closeable={false}
            kind={KIND.yellow}
            variant={VARIANT.solid}
            overrides={{
              Root: {
                style: {
                  position: "absolute",
                  top: 0,
                  right: "-5px",
                  zIndex: 1,
                  marginRight: 0,
                },
              },
            }}
          >
            <Icon>
              <FontAwesomeIcon icon={faCrown} />
            </Icon>
          </Tag>
        ) : null}
      </Block>

      <Label1>{user?.name} </Label1>
      {/* todo flag icon */}
      {user?.country ? user?.country : null}
    </Block>
  );
}
